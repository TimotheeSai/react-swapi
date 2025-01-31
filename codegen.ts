import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  // schema: import.meta.env.VITE_GRAPHQL_API,
  schema: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{ts,tsx}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;

