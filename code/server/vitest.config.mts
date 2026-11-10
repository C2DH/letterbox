import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
    include: ['test/**/[^_]*.test.ts'],
    env: {
      ELASTICSEARCH_INDEX_PREFIX: 'test_',
      NEO4J_URL: 'bolt://localhost:8687',
    },
    testTimeout: 10000,
  },
});
