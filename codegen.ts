import { CodegenConfig } from "@graphql-codegen/cli";
import "dotenv/config";
import loadEnvVar from "./app/helpers/load-env-var";

const CELO_EXPLORER_API_URL = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL,
);
const SUBGRAPH_URL = loadEnvVar(process.env.NEXT_PUBLIC_SUBGRAPH_URL);

const config: CodegenConfig = {
  generates: {
    "./app/graphql/subgraph/generated/": {
      schema: [SUBGRAPH_URL, "./schema.client.graphql"],
      documents: ["app/graphql/subgraph/**/*.graphql"],
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./app/graphql/celo-explorer/generated/": {
      schema: CELO_EXPLORER_API_URL,
      documents: ["app/graphql/celo-explorer/**/*.graphql"],
      preset: "client",
    },
  },
  ignoreNoDocuments: true,
};

export default config;
