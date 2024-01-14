import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode, useEffect, useState } from "react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { newApolloClient } from "@/app/graphql/apollo.client";
import { wagmiConfig } from "@/app/helpers/wagmi.config";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <ApolloNextAppProvider makeClient={newApolloClient}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{mounted && children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloNextAppProvider>
  );
}
