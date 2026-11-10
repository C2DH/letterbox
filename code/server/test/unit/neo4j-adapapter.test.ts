import {
  authFlowTestSuite,
  createTestSuite,
  joinsTestSuite,
  normalTestSuite,
  testAdapter,
  transactionsTestSuite,
  uuidTestSuite,
} from '@better-auth/test-utils/adapter';
import { organization } from 'better-auth/plugins/organization';
import { noop } from 'lodash';
import 'reflect-metadata';
import { expect } from 'vitest';

import config from '../../src/config';
import { neo4jAdapter } from '../../src/services/auth/neo4j-adapter';
import { Neo4j } from '../../src/services/neo4j';

const customTestSuite = createTestSuite('Custom', {}, ({ adapter, generate, modifyBetterAuthOptions }) => ({
  'should return the custom adapter ID': async () => {
    expect(adapter.id).toBe('neo4j-adapter');
  },
  'should create data in neo4j without exception': async () => {
    await modifyBetterAuthOptions({ plugins: [organization({ teams: { enabled: true } })] }, true);
    const user = await adapter.create({
      model: 'user',
      data: { ...(await generate('user')) },
      forceAllowId: true,
    });
    await adapter.create({
      model: 'session',
      data: {
        ...(await generate('session')),
        userId: user.id,
      },
      forceAllowId: true,
    });
    await adapter.create({
      model: 'account',
      data: {
        ...(await generate('account')),
        userId: user.id,
      },
      forceAllowId: true,
    });
    const organizationData = await adapter.create({
      model: 'organization',
      data: {
        name: 'Test Organization',
        slug: 'test-org-' + Math.random(),
        createdAt: new Date(),
      },
      forceAllowId: true,
    });
    await adapter.create({
      model: 'team',
      data: {
        name: 'Test Team',
        organizationId: organizationData.id,
        createdAt: new Date(),
      },
      forceAllowId: true,
    });
    await adapter.create({
      model: 'member',
      data: {
        organizationId: organizationData.id,
        userId: user.id,
        role: 'owner',
        createdAt: new Date(),
      },
      forceAllowId: true,
    });
  },
}));

const disableTests = { 'create - should support json': true };
async function main() {
  const { execute } = await testAdapter({
    // The adapter and test utilities resolve different copies of Better Auth's types.
    adapter: async () => neo4jAdapter(config.neo4j),
    runMigrations: noop,
    tests: [
      customTestSuite(),
      authFlowTestSuite(),
      transactionsTestSuite(),
      uuidTestSuite({ disableTests }),
      joinsTestSuite({ disableTests }),
      normalTestSuite({ disableTests }),
    ],
    additionalCleanups: async () => {
      const neo4j = new Neo4j(config.neo4j);
      await neo4j.resetDatabase();
    },
    onFinish: async () => {
      const neo4j = new Neo4j(config.neo4j);
      await neo4j.resetDatabase();
    },
  });

  execute();
}

main();
