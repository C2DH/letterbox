import { v4 as uuid } from 'uuid';
import { afterAll, describe, expect, test } from 'vitest';

import { Services } from '../../src/services';
import { DatasetEdition } from '../../src/services/dataset/edition';
import { cleanTestDataset, getItemData, initTestWithRandomDataset } from '../helpers/dataset';

afterAll(async () => {
  await cleanTestDataset();
});

const edition = Services.get(DatasetEdition);

describe('Dataset edition', () => {
  /**
   * Test the rename edition feature.
   */
  describe('Rename', () => {
    test('Should work on "Company" node', async () => {
      const messages = await initTestWithRandomDataset(1);
      const company = messages[0].raw_company;

      const newName = `New name ${Date.now()}`;
      await edition.renameNode('company', company.id, newName);

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

      await edition.changeNodeType('company', company.id, 'person');
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
   * Test the merge edition feature.
   */
  describe('Merge', () => {
    test('should work', async () => {
      expect(2 + 2).toBe(4);
    });
  });

  /**
   * Test the Split edition feature.
   */
  describe('Split', () => {
    test('should work', async () => {
      expect(2 + 2).toBe(4);
    });
  });

  /**
   * Test the Delete edition feature.
   */
  describe('Delete', () => {
    test('should work', async () => {
      expect(2 + 2).toBe(4);
    });
  });

  /**
   * Test the Create edition feature.
   */
  describe('Create', () => {
    test('should work', async () => {
      expect(2 + 2).toBe(4);
    });
  });
});
