"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, HttpLink, gql } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { ProposalStatus } from "../interfaces/proposal.interface";

// have a function to create a client for you
export function newApolloClient() {
  const httpLink = new HttpLink({
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

  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Proposal: {
          fields: {
            status: {
              read(_, { readField }): ProposalStatus {
                const queued = readField("queued");
                const canceled = readField("canceled");
                const executed = readField("executed");
                if (queued) {
                  return ProposalStatus.pending;
                }
                if (canceled) {
                  return ProposalStatus.defeated;
                }
                if (executed) {
                  return ProposalStatus.executed;
                }
                // Todo figure out how to make it better
                return ProposalStatus.active;
              },
            },
          },
        },
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
