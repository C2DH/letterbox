import { Services } from '../../src/services';
import { DatasetImport } from '../../src/services/dataset/import';
import { DatasetIndexation } from '../../src/services/dataset/indexation';
import { Neo4j } from '../../src/services/neo4j';
import { DataMessage } from '../../src/types';

const datasetIndexation = Services.get(DatasetIndexation);
const datasetImport = Services.get(DatasetImport);
const neo4j = Services.get(Neo4j);

/**
 * Init the database with the given messages
 */
export async function initTestDatasets(messages: DataMessage[]): Promise<void> {
  try {
    await datasetImport.importRecords(messages);
    await datasetIndexation.doIndexation();
  } catch (e) {
    console.error('Error initializing test datasets', e);
    throw e;
  }
}

export async function dropTestDatasets(): Promise<void> {
  try {
    await neo4j.resetDatabase();
  } catch (e) {
    console.error('Error dropping test datasets', e);
    throw e;
  }
}
