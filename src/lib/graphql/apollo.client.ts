"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, createHttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import loadEnvVar from "@lib/helpers/load-env-var";
import { ProposalPolicy } from "./subgraph/policies/Proposal";

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

// have a function to create a client for you
export function newApolloClient() {
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
            httpLink,
          ])
        : httpLink,
  });
}
