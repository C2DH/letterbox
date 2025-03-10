import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    './src/graphql/generated/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        defaultScalarType: 'unknown',
        maybeValue: 'T',
        strictScalars: true,
        useIndexSignature: false,
      },
    },
  },
};

export default config;
