import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/**/*.ts([x])?', '!src/core/graphql/generated/*'],
  generates: {
    './src/core/graphql/generated/': {
      plugins: ['typescript', 'typescript-operations'],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        dedupeFragments: true,
      },
    },
  },
  watchConfig: {
    usePolling: true,
    interval: 1000,
  },
};

export default config;
