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
import { IS_PROD } from "@/lib/constants/utils";

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
  chains: !IS_PROD ? [Alfajores, Celo] : [Celo],
  transports: !IS_PROD
    ? {
        [Alfajores.id]: http(Alfajores.rpcUrls.default.http[0]),
        [Celo.id]: http(Celo.rpcUrls.default.http[0]),
      }
    : {
        [Celo.id]: http(Celo.rpcUrls.default.http[0]),
      },
  connectors,
});
