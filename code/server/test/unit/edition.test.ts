import { afterEach } from 'node:test';
import { v4 as uuid } from 'uuid';
import { describe, expect, test } from 'vitest';

import type { DataMessage, ItemType } from '../..//src/types';
import { Services } from '../../src/services';
import { DatasetEdition } from '../../src/services/dataset/edition';
import {
  checkMessage,
  cleanTestDataset,
  getItemData,
  initTestWithRandomDataset,
} from '../helpers/dataset';

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
      expect(edition.renameNode('message', message.id, '')).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      expect(edition.renameNode('company', uuid(), '')).rejects.toThrowError();
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
      expect(edition.changeNodeType('message', message.id, 'person')).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      expect(edition.changeNodeType('company', uuid(), 'person')).rejects.toThrowError();
    });
  });

  /**
   * Test the Create edition feature.
   */
  describe('Create', () => {
    test('should work', async () => {
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
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_people: [{ id: node.id, name }, ...message.raw_people!],
      });
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      expect(edition.createNode(message.id, 'message', '')).rejects.toThrowError();
    });

    test('Should fail with not found message', async () => {
      expect(edition.createNode(`${Date.now()}`, 'person', '')).rejects.toThrowError();
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
      const deletedNode = await getItemData('company', message.raw_company.id);
      expect(deletedNode!.deleted).toBe(true);
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_company: null,
      } as unknown as DataMessage<{ id: string; name: string }>);
    });

    test('Should fail on "Message" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const message = messages[0];
      expect(edition.deleteNode('message', message.id)).rejects.toThrowError();
    });

    test('Should fail with not found node', async () => {
      expect(edition.deleteNode('company', `${Date.now()}`)).rejects.toThrowError();
    });
  });

  /**
   * Test the merge edition feature.
   */
  describe('Merge', () => {
    test('should work', async () => {
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

      // Checks
      // ~~~~~~~~~~~~~~~~~~~~~~
      const mergedNode = await getItemData('person', id);
      // Check the node has been created
      expect(mergedNode!.name).toBe(nodeName);
      // Check merged nodes are not present anymore
      for (const person of people) {
        await expect(getItemData('person', person.id)).resolves.toBeNull();
      }
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

      expect(
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
      const nodes = await edition.splitNode('person', person.id, names);

      // Check created nodes
      // ~~~~~~~~~~~~~~~~~~~~~~
      expect(nodes.length).toBe(3);
      for (const person of nodes) {
        await expect(getItemData('person', person.id)).resolves.not.toBeNull();
      }
      // Check that the original node has been deleted
      const deletedNode = await getItemData('person', person.id);
      expect(deletedNode!.deleted).toBe(true);
      // Check the shape of the message
      await checkMessage(message.id, {
        ...message,
        raw_people: [
          ...(message.raw_people?.slice(1) || []),
          ...nodes.map((n, index) => ({ id: n.id, name: names[index] })),
        ],
      });
    });
  });
});
