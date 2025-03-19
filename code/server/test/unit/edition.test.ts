import { afterEach } from 'node:test';
import { sum, values } from 'lodash';
import { v4 as uuid } from 'uuid';
import { beforeAll, describe, expect, test } from 'vitest';

import type { DataMessage, ItemType } from '../..//src/types';
import { Services } from '../../src/services';
import { DatasetEdition } from '../../src/services/dataset/edition';
import {
  checkMessage,
  cleanTestDataset,
  getItemData,
  initElastic,
  initTestWithRandomDataset,
} from '../helpers/dataset';

beforeAll(async () => {
  await initElastic();
});

afterEach(async () => {
  await cleanTestDataset();
});

const edition = Services.get(DatasetEdition);

/**
 *  Unit tests for the edition feature.
 *  TODO: check the elastic indices after each operation.
 */
describe('Dataset edition', () => {
  /**
   * Test the rename edition feature.
   */
  describe('Rename', () => {
    test('Should work on "Company" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const company = messages[0].raw_company;
      const newName = `New name ${Date.now()}`;

      // Do the rename
      // ~~~~~~~~~~~~~~~~~~~~~~
      await edition.renameNode('company', company.id, newName);

      // Check that the name has changed
      // ~~~~~~~~~~~~~~~~~~~~~~
      const newValue = await getItemData('company', company.id);
      expect(newValue!.name).toBe(newName);
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      await expect(edition.renameNode('message', message.id, '')).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      await expect(edition.renameNode('company', uuid(), '')).rejects.toThrowError();
    });
  });

  /**
   * Test the change type edition feature.
   */
  describe('Change type', () => {
    test('should work on "Company" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const company = messages[0].raw_company;

      // Do the change
      // ~~~~~~~~~~~~~~~~~~~~~~
      await edition.changeNodeType('company', company.id, 'person');

      // Check the node has been changed
      // ~~~~~~~~~~~~~~~~~~~~~~
      const newValue = await getItemData('person', company.id);
      expect(newValue).not.toBeNull();
      expect(newValue!.name).toBe(company.name);
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      await expect(edition.changeNodeType('message', message.id, 'person')).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      await expect(edition.changeNodeType('company', uuid(), 'person')).rejects.toThrowError();
    });
  });

  /**
   * Test the Create edition feature.
   */
  describe('Create', () => {
    test('Create a new person node on a message should work', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      const name = `My name ${Date.now()}`;

      // Do the node create
      // ~~~~~~~~~~~~~~~~~~~~~~
      const node = await edition.createNode(message.id, 'person', name);

      // Check the created node
      // ~~~~~~~~~~~~~~~~~~~~~~
      const nodeValue = await getItemData('person', node.id);
      expect(nodeValue).not.toBeNull();
      expect(nodeValue!.name).toBe(name);
      // apply modifications in ElasticSearch
      await edition.indexPendingModifications();
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_people: [{ id: node.id, name }, ...message.raw_people!],
      });
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      await expect(edition.createNode(message.id, 'message', '')).rejects.toThrowError();
    });

    test('Should fail with not found message', async () => {
      await expect(edition.createNode(`${Date.now()}`, 'person', '')).rejects.toThrowError();
    });
  });

  /**
   * Test the Delete edition feature.
   */
  describe('Delete', () => {
    test('should work', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];

      // Do the delete
      // ~~~~~~~~~~~~~~~~~~~~~~
      await edition.deleteNode('company', message.raw_company.id);

      // Checks
      // ~~~~~~~~~~~~~~~~~~~~~~
      const deletedNode = await getItemData('company', message.raw_company.id, true);
      expect(deletedNode!.deleted).toBe(true);
      // apply modifications in ElasticSearch
      await edition.indexPendingModifications();
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_company: null,
      } as unknown as DataMessage<{ id: string; name: string }>);
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      await expect(edition.deleteNode('message', message.id)).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      await expect(edition.deleteNode('company', `${Date.now()}`)).rejects.toThrowError();
    });
  });

  /**
   * Test the merge edition feature.
   */
  describe('Merge', () => {
    test('Merging all people of a message should work', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      const people = message.raw_people!;
      const nodeName = `My name ${Date.now()}`;

      // Do the merge
      // ~~~~~~~~~~~~~~~~~~~~~~
      const { id } = await edition.mergeNodes(
        people.map((p) => ({ type: 'person', id: p.id })),
        'person',
        nodeName,
      );
      // check Pending Modifications labels works
      const nbImpactedMessages = await edition.countItemsWithPendingModifications();
      expect(nbImpactedMessages).toBeGreaterThan(0);

      // Checks
      // ~~~~~~~~~~~~~~~~~~~~~~
      const mergedNode = await getItemData('person', id);
      // Check the node has been created
      expect(mergedNode!.name).toBe(nodeName);
      // Check merged nodes are not present anymore
      for (const person of people) {
        await expect(getItemData('person', person.id)).resolves.toBeNull();
      }
      // apply modifications in ElasticSearch
      const reports = await edition.indexPendingModifications();
      expect(sum(values(reports).map((r) => r.count))).toEqual(nbImpactedMessages);
      // check Pending Modifications labels works
      const nbPendingModifications = await edition.countItemsWithPendingModifications();
      expect(nbPendingModifications).toEqual(0);

      // Check the shape of the message
      await checkMessage(messages[0].id, {
        ...message,
        raw_people: [{ id, name: nodeName }],
      });
    });

    test('Should fail with one not found node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const people = messages[0].raw_people!;
      const nodeName = `My name ${Date.now()}`;

      await expect(
        edition.mergeNodes(
          [
            ...people.map((p) => ({ type: 'person' as ItemType, id: p.id })),
            { type: 'person' as ItemType, id: '404' },
          ],
          'person',
          nodeName,
        ),
      ).rejects.toThrowError();
    });
  });

  /**
   * Test the Split edition feature.
   */
  describe('Split', () => {
    test('should work', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      const person = message.raw_people![0];
      const names = ['Pierre', 'Paul', 'Jacques'];

      // Do the split
      // ~~~~~~~~~~~~~~~~~~~~~~
      const data = await edition.splitNode('person', person.id, names);

      // Check created nodes
      // ~~~~~~~~~~~~~~~~~~~~~~
      expect(data.nodes.length).toBe(3);
      for (const person of data.nodes) {
        await expect(getItemData('person', person.id)).resolves.not.toBeNull();
      }
      // Check that the original node has been deleted
      const deletedNode = await getItemData('person', person.id, true);
      expect(deletedNode!.deleted).toBe(true);
      // check apply modifications in ElasticSearch
      // check Pending Modifications labels works
      const nbImpactedMessages = await edition.countItemsWithPendingModifications();
      expect(nbImpactedMessages).toBeGreaterThan(0);
      const reports = await edition.indexPendingModifications();
      expect(sum(values(reports).map((r) => r.count))).toEqual(nbImpactedMessages);
      // check Pending Modifications labels works
      const nbPendingModifications = await edition.countItemsWithPendingModifications();
      expect(nbPendingModifications).toEqual(0);
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_people: [
          ...(message.raw_people?.slice(1) || []),
          ...data.nodes.map((n, index) => ({ id: n.id, name: names[index] })),
        ],
      });
    });
  });
});
