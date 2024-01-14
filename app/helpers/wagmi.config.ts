import { createConfig, http, Chain, WagmiConfig } from "wagmi";
import { Alfajores, Baklava, Celo } from "@/app/helpers/chains";
import {
  metaMaskWallet,
  omniWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { valora } from "./Valora.wallet";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended for Celo chains",
      wallets: [
        metaMaskWallet,
        walletConnectWallet,
        valora,
        omniWallet,
        trustWallet,
      ],
    },
  ],
  {
    appName: "Mento Governance",
    projectId:
      process?.env?.NEXT_PUBLIC_WALLET_CONNECT_ID || "123123123123123123",
  },
);

export const wagmiConfig = createConfig({
  chains: [Alfajores, Baklava, Celo],
  transports: {
    [Alfajores.id]: http(),
    [Baklava.id]: http(),
    [Celo.id]: http(),
  },
  // autoConnect: true,
  connectors,
});
