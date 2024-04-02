import { ReactNode, useEffect, useState } from "react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { makeClient } from "@/lib/graphql/apollo.client";
import { wagmiConfig } from "@/config/wagmi.config";
import { Celo } from "@/config/chains";
import { ThemeProvider } from "next-themes";

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={Celo}>
            {mounted && (
              <ThemeProvider attribute="class">{children}</ThemeProvider>
            )}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ApolloNextAppProvider>
  );
}
