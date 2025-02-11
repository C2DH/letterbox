import { wait } from '@ouestware/async';
import 'reflect-metadata';

import { Neo4j } from '../services/neo4j';

const queries = [
  'CREATE CONSTRAINT Country_name IF NOT EXISTS FOR (n:Country) REQUIRE n.name IS UNIQUE',
  'CREATE CONSTRAINT Address_name IF NOT EXISTS FOR (n:Address) REQUIRE n.name IS UNIQUE',
  'CREATE CONSTRAINT Person_name IF NOT EXISTS FOR (n:Person) REQUIRE n.name IS UNIQUE',
  'CREATE CONSTRAINT Company_name IF NOT EXISTS FOR (n:Company) REQUIRE n.name IS UNIQUE',
  'CREATE CONSTRAINT Message_fingerprint IF NOT EXISTS FOR (n:Message) REQUIRE n.fingerprint IS UNIQUE',
];

async function exec(iteration = 0) {
  try {
    await wait(10000);
    const neo4j = new Neo4j();
    await Promise.all(queries.map(async (q) => await neo4j.getFirstResultQuery(q, {})));
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
