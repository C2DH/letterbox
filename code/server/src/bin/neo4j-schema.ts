import { wait } from '@ouestware/async';

import 'reflect-metadata';

import { Neo4j } from '../services/neo4j';

const queries = [
  'CREATE CONSTRAINT Country_ID IF NOT EXISTS FOR (n:Country) REQUIRE n.id IS UNIQUE',
  'CREATE INDEX Country_name IF NOT EXISTS FOR (n:Country) ON (n.name)',
  'CREATE CONSTRAINT Address_ID IF NOT EXISTS FOR (n:Address) REQUIRE n.id IS UNIQUE',
  'CREATE INDEX Address_name IF NOT EXISTS FOR (n:Address) ON (n.name)',
  'CREATE CONSTRAINT Person_ID IF NOT EXISTS FOR (n:Person) REQUIRE n.id IS UNIQUE',
  'CREATE INDEX Person_name IF NOT EXISTS FOR (n:Person) ON (n.name)',
  'CREATE CONSTRAINT Company_ID IF NOT EXISTS FOR (n:Company) REQUIRE n.id IS UNIQUE',
  'CREATE INDEX Company_name IF NOT EXISTS FOR (n:Company) ON (n.name)',
  'CREATE CONSTRAINT Message_ID IF NOT EXISTS FOR (n:Message) REQUIRE n.id IS UNIQUE',
];

async function exec(iteration = 0) {
  try {
    await wait(10000);
    console.log(`Running iteration ${iteration}`);
    const neo4j = new Neo4j();
    // Test connection
    await neo4j.getFirstResultQuery(`RETURN 1 as result`, {});

    // Create constraints (never fails)
    for (const query of queries) {
      try {
        console.log('rruning query', query);
        await neo4j.getFirstResultQuery(query, {});
      } catch (e) {
        console.error('Failed to run query', query);
        throw e;
      }
    }
  } catch (e) {
    if (iteration < 5) await exec(iteration + 1);
    else throw e;
  }
}

exec()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
