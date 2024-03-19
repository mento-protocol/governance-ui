import { Alfajores, Celo } from "@/config/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import { valora } from "@/config/valora.wallet";

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
  chains: [Alfajores, Celo],
  transports: {
    [Alfajores.id]: http(),
    [Celo.id]: http(),
  },
  // autoConnect: true,
  connectors,
});
