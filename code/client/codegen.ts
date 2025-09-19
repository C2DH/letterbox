import { CodegenConfig } from '@graphql-codegen/cli';
import { loadEnv } from 'vite';

// Load environment variables using Vite's loadEnv function
const mode = process.env.NODE_ENV || 'development';
const env = loadEnv(mode, process.cwd(), '');

const CodegenConfigSchemaURL = env.VITE_GRAPHQL_SCHEMA_URL || 'http://localhost:4000/graphql';

console.log('GraphQL Codegen using API endpoint: ', CodegenConfigSchemaURL);

const config: CodegenConfig = {
  schema: CodegenConfigSchemaURL,
  documents: ['src/**/*.ts([x])?', '!src/core/graphql/generated/*'],
  generates: {
    './src/core/graphql/generated/': {
      //plugins: ['typescript', 'typescript-operations'],
      preset: 'client',
      presetConfig: {
        fragmentMasking: false,
      },
      config: {
        dedupeFragments: true,
        //     scalars: {
        //       DateTime: 'Date',
        //       Int64: 'string',
        //     },
      },
    },
  },
  watchConfig: {
    usePolling: true,
    interval: 1000,
  },
};

export default config;
