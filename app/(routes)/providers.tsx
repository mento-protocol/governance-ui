import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { Alfajores, Baklava, Celo } from "@celo/rainbowkit-celo/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { getWalletConnectors } from "@/app/helpers/wallet";
import { ReactNode, useEffect, useState } from "react";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { newApolloClient } from "@/app/graphql/apollo.client";

const { chains, publicClient } = configureChains(
  [Alfajores, Baklava, Celo],
  [
    jsonRpcProvider({
      rpc: (chain: any) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended for Celo chains",
    wallets: getWalletConnectors(chains),
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <ApolloNextAppProvider makeClient={newApolloClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          {mounted && children}
        </RainbowKitProvider>
      </WagmiConfig>
    </ApolloNextAppProvider>
  );
}
