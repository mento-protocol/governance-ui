import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  generates: {
    "./app/graphql/subgraph/generated/": {
      schema: [
        "https://api.studio.thegraph.com/query/63311/mento/version/latest",
        "./schema.client.graphql",
      ],
      documents: ["app/graphql/subgraph/**/*.graphql"],
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./app/graphql/celo-explorer/generated/": {
      schema: "https://explorer.celo.org/alfajores/graphiql",
      documents: ["app/graphql/celo-explorer/**/*.graphql"],
      config: {
        typesPrefix: "Ex",
      },
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
