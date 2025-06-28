"use client";
// ^ this file needs the "use client" pragma

import { ProposalPolicy } from "@/lib/graphql/subgraph/policies/Proposal";
import loadEnvVar from "@/lib/helpers/load-env-var";
import { ApolloLink, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

const CELO_EXPLORER_API_URL = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL,
);
const CELO_EXPLORER_API_URL_ALFAJORES = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL_ALFAJORES,
);

const SUBGRAPH_URL = loadEnvVar(process.env.NEXT_PUBLIC_SUBGRAPH_URL);
const SUBGRAPH_URL_ALFAJORES = loadEnvVar(
  process.env.NEXT_PUBLIC_SUBGRAPH_URL_ALFAJORES,
);

// API Keys for The Graph
const GRAPH_API_KEY = loadEnvVar(process.env.NEXT_PUBLIC_GRAPH_API_KEY);
const GRAPH_API_KEY_ALFAJORES = loadEnvVar(
  process.env.NEXT_PUBLIC_GRAPH_API_KEY_ALFAJORES,
);

// have a function to create a client for you
export function makeClient() {
  const httpLink = createHttpLink({
    // needs to be an absolute url, as relative urls cannot be used in SSR
    uri: (operation) => {
      const { apiName } = operation.getContext();

      switch (apiName) {
        case "celoExplorer":
          return CELO_EXPLORER_API_URL;
        case "celoExplorerAlfajores":
          return CELO_EXPLORER_API_URL_ALFAJORES;
        case "subgraph":
          return SUBGRAPH_URL;
        case "subgraphAlfajores":
          return SUBGRAPH_URL_ALFAJORES;
        default:
          return SUBGRAPH_URL;
      }
    },

    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  // Auth link to add API keys to requests
  const authLink = setContext((_, { headers, ...context }) => {
    const { apiName } = context;

    // Determine which API key to use based on the API name
    let authToken = "";

    switch (apiName) {
      case "subgraph":
        authToken = GRAPH_API_KEY || "";
        break;
      case "subgraphAlfajores":
        authToken = GRAPH_API_KEY_ALFAJORES || "";
        break;
      default:
        authToken = "";
        break;
    }

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        // Add authorization header if API key exists
        ...(authToken && { authorization: `Bearer ${authToken}` }),
      },
    };
  });

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Proposal: ProposalPolicy,
      },
    }),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink,
            httpLink,
          ])
        : authLink.concat(httpLink),
  });
}
