"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ProposalPolicy } from "./subgraph/policies/Proposal";

// have a function to create a client for you
export function newApolloClient() {
  const httpLinkTheGraph = new HttpLink({
    // this needs to be an absolute url, as relative urls cannot be used in SSR
    uri: "https://api.studio.thegraph.com/query/63311/mento/version/latest",
    // you can disable result caching here if you want to
    // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
    fetchOptions: { cache: "no-store" },
    // you can override the default `fetchOptions` on a per query basis
    // via the `context` property on the options passed as a second argument
    // to an Apollo Client data fetching hook, e.g.:
    // const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
  });

  const httpLinkCeloExplorer = new HttpLink({
    uri: "https://explorer.celo.org/alfajores/graphiql",
  });

  const endpoints = ApolloLink.split(
    (operation) => operation.getContext().apiName === "celoExplorer",
    httpLinkCeloExplorer,
    httpLinkTheGraph,
  );

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
            endpoints,
          ])
        : endpoints,
  });
}
