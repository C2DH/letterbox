import { faker } from '@faker-js/faker';
import { omit } from 'lodash';
import { v4 as uuid } from 'uuid';
import { expect } from 'vitest';

import { Services } from '../../src/services';
import { DatasetImport } from '../../src/services/dataset/import';
import { DatasetIndexation } from '../../src/services/dataset/indexation';
import { Elastic } from '../../src/services/elastic';
import { Neo4j } from '../../src/services/neo4j';
import { DataMessage, EsIndices, ItemType, Neo4jLabels } from '../../src/types';

const datasetIndexation = Services.get(DatasetIndexation);
const datasetImport = Services.get(DatasetImport);

const es = Services.get(Elastic);
const neo4j = Services.get(Neo4j);

/**
 * Init Es
 */
export async function initElastic() {
  await datasetIndexation.createIndices();
}

/**
 * Init the database with the given messages.
 */
export async function initTestDataset(
  messages: DataMessage[],
): Promise<Array<DataMessage<{ id: string; name: string }>>> {
  try {
    const result = await datasetImport.importRecords(messages);
    await datasetIndexation.doIndexation(false);
    return result;
  } catch (e) {
    console.error('Error initializing test datasets', e);
    throw e;
  }
}

/**
 * Init the database with a random dataset of `nbMessage` messages.
 */
export async function initTestWithRandomDataset(
  nbMessage: number,
): Promise<Array<DataMessage<{ id: string; name: string }>>> {
  const data = generateRandomMessages(nbMessage);
  return await initTestDataset(data);
}

/**
 * Clean the database.
 */
export async function cleanTestDataset(): Promise<void> {
  try {
    await neo4j.resetDatabase();
    await datasetIndexation.doIndexation(true);
  } catch (e) {
    console.error('Error while cleaning test datasets', e);
    throw e;
  }
}

export async function getItemData(
  type: ItemType,
  id: string,
  includeDeleted = false,
): Promise<null | Record<string, unknown>> {
  return await neo4j.getFirstResultQuery<Record<string, unknown>>(
    ` MATCH (n:${Neo4jLabels[type]} { id: $id }) 
      ${!includeDeleted ? 'WHERE NOT coalesce(n.deleted, false)' : ''}
      RETURN n { .*} AS result`,
    { id },
  );
}

/**
 * Generates some random messages.
 */
export function generateRandomMessages(
  numberOfMessages: number,
  poolOpts?: {
    company?: number;
    country?: number;
    person?: number;
    address?: number;
  },
): DataMessage[] {
  const DEFAULT_POOL_SIZE = 10;

  const companies: Set<string> = new Set();
  while (companies.size < (poolOpts?.company || DEFAULT_POOL_SIZE)) {
    companies.add(faker.company.name());
  }

  const addresses: Set<string> = new Set();
  while (addresses.size < (poolOpts?.address || DEFAULT_POOL_SIZE)) {
    addresses.add(faker.location.streetAddress(true));
  }

  const people: Set<string> = new Set();
  while (people.size < (poolOpts?.person || DEFAULT_POOL_SIZE)) {
    people.add(faker.person.fullName());
  }

  const countries: Set<string> = new Set();
  while (countries.size < (poolOpts?.country || DEFAULT_POOL_SIZE)) {
    countries.add(faker.location.country());
  }

  return Array.from({ length: numberOfMessages }).map(() => {
    const message = {
      id: uuid(),
      year: faker.date.past({ years: 60 }).getFullYear(),
      filename: faker.system.fileName(),
      pageNumber: faker.number.int({ min: 1, max: 100 }),
      message: faker.lorem.sentence(),
      raw_company: getRandomSetItem(companies),
      raw_address: getRandomSetItem(addresses),
      raw_people: getRandomSetItems(people, faker.number.int({ min: 1, max: 5 })),
      raw_countries: getRandomSetItems(countries, 2),
    };

    return {
      ...message,
      raw_message: message.message,
    };
  });
}

/**
 * Retrieve the data of a message.
 */
export async function getDataMessage(
  id: string,
): Promise<null | DataMessage<{ id: string; name: string }>> {
  const message = await neo4j.getFirstResultQuery<DataMessage<{ id: string; name: string }>>(
    ` MATCH (n:Message {id: $id}) 
      RETURN { 
        id: n.id,
        year: n.year,
        filename: n.filename,
        pageNumber: n.pageNumber,
        message: n.message,
        raw_message: n.message,
        raw_company: head(collect { MATCH (n)-[r]->(m:Company) WHERE NOT coalesce(r.deleted, false) RETURN DISTINCT { id:m.id, name: m.name } }),
        raw_address: head(collect { MATCH (n)-[r]->(m:Address) WHERE NOT coalesce(r.deleted, false)RETURN DISTINCT { id:m.id, name: m.name } }),
        raw_people: collect { MATCH (n)-[r]->(m:Person) WHERE NOT coalesce(r.deleted, false) RETURN DISTINCT { id:m.id, name: m.name } },
        raw_countries: collect { MATCH (n)-[r]->(m:Country) WHERE NOT coalesce(r.deleted, false) RETURN DISTINCT { id:m.id, name: m.name } }
      } AS result`,
    { id },
  );
  return message;
}

export async function checkMessage(
  messageId: string,
  message: DataMessage<{ id: string; name: string }>,
) {
  const data = await getDataMessage(messageId);

  expect(data).not.toBeNull();
  if (data) {
    expect(message.id).toStrictEqual(data.id);
    expect(message.year).toStrictEqual(data.year);
    expect(message.filename).toStrictEqual(data.filename);
    expect(message.pageNumber).toStrictEqual(data.pageNumber);
    expect(message.message).toStrictEqual(data.message);
    expect(message.raw_message).toStrictEqual(data.raw_message);
    expect(message.raw_company).toStrictEqual(data.raw_company);
    expect(message.raw_address).toStrictEqual(data.raw_address);

    expect(message.raw_people?.sort(sortById)).toStrictEqual(data.raw_people?.sort(sortById));
    expect(message.raw_countries?.sort(sortById)).toStrictEqual(data.raw_countries?.sort(sortById));

    await checkMessageIndexation(messageId);
  }
}

export async function checkMessageIndexation(id: string) {
  await es.client.indices.flush({ index: EsIndices['message'] });
  await es.client.indices.flush({ index: EsIndices['company'] });
  await es.client.indices.flush({ index: EsIndices['person'] });
  await es.client.indices.flush({ index: EsIndices['country'] });
  await es.client.indices.flush({ index: EsIndices['address'] });

  const data = await getDataMessage(id);
  if (!data) throw new Error('Message not found');

  await checkItemIndexation('message', id);
  if (data.raw_company) await checkItemIndexation('company', data.raw_company.id);
  if (data.raw_address) await checkItemIndexation('address', data.raw_address.id);
  for (const person of data.raw_people || []) {
    await checkItemIndexation('person', person.id);
  }
  for (const country of data.raw_countries || []) {
    await checkItemIndexation('country', country.id);
  }
}

async function checkItemIndexation(type: ItemType, id: string) {
  let indexName: string = EsIndices['message'];
  let indexQuery: string = datasetIndexation.getIndexMessagesQuery([id]);
  switch (type) {
    case 'company':
      indexName = EsIndices['company'];
      indexQuery = datasetIndexation.getIndexCompaniesQuery([id]);
      break;
    case 'address':
      indexName = EsIndices['address'];
      indexQuery = datasetIndexation.getIndexAddressesQuery([id]);
      break;
    case 'person':
      indexName = EsIndices['person'];
      indexQuery = datasetIndexation.getIndexPeopleQuery([id]);
      break;
    case 'country':
      indexName = EsIndices['country'];
      indexQuery = datasetIndexation.getIndexCountriesQuery([id]);
      break;
  }
  const neoData = await neo4j.getFirstResultQuery<Record<string, unknown>>(indexQuery, {
    ids: [id],
  });
  if (!neoData) throw new Error(`${type} / ${id} not found in Neo4j`);
  const esData = await es.getDocument<Record<string, unknown>>(indexName, id);
  expect(omit(esData, ['fingerprint']), `Bad ES value for ${type}/${id}`).toStrictEqual(neoData);
}

function sortById<T extends { id: string }>(a: T, b: T): number {
  return a.id < b.id ? 1 : -1;
}
function getRandomSetItem<T>(set: Set<T>): T {
  const items = Array.from(set);
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomSetItems<T>(set: Set<T>, numberOfItems: number): T[] {
  const selected = new Set<T>();

  const items = Array.from(set);
  if (numberOfItems >= items.length) return items;

  while (selected.size < numberOfItems) {
    selected.add(items[Math.floor(Math.random() * items.length)]);
  }

  return Array.from(selected);
}
