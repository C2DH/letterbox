import { afterEach, beforeEach, describe, expect, test } from 'vitest';

import { dropTestDatasets, initTestDatasets } from '../helpers/dataset';

beforeEach(async () => {
  await initTestDatasets([
    {
      id: '1',
      year: 2000,
      filename: 'test.pdf',
      pageNumber: 1,
      message: 'just a test',
      raw_message: 'just a test',
      raw_company: 'OUESTWARE',
      raw_company_spare: 'OUESTWARE',
      raw_address: '1 rue de la paix, Paris, France',
      raw_address_spare: '1 rue de la paix, Paris, France',
      raw_people: ['Benoit SIMARD', 'Paul GIRARD', 'Alexis JACOMY'],
      raw_countries: ['France', 'Luxembourg'],
    },
  ]);
});

afterEach(async () => {
  await dropTestDatasets();
});

describe('Testing Sample', () => {
  test('should work', async () => {
    expect(2 + 2).toBe(4);
  });
});
