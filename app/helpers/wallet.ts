import type { Chain, Wallet } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  omniWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { getWalletConnectUri } from "@celo/rainbowkit-celo/utils/getWalletConnectUri";
import { isAndroid } from "@walletconnect/legacy-utils";
import { getWalletConnectConnector } from "@rainbow-me/rainbowkit";
import { Alfajores, Baklava, Celo } from "@celo/rainbowkit-celo/chains";

interface WalletOptions {
  chains: Chain[];
  projectId: string;
}

export function getWalletConnectors(chains: Chain[]) {
  const connectorConfig = {
    chains,
    projectId:
      process?.env?.NEXT_PUBLIC_WALLET_CONNECT_ID || "123123123123123123",
  };

  return [
    metaMaskWallet(connectorConfig),
    walletConnectWallet(connectorConfig),
    Valora(connectorConfig),
    omniWallet(connectorConfig),
    trustWallet(connectorConfig),
  ];
}

export const Valora = ({
  chains = [Alfajores, Baklava, Celo],
  projectId,
}: WalletOptions): Wallet => ({
  id: "valora",
  name: "Valora",
  iconUrl:
    "https://registry.walletconnect.com/api/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974",
  iconBackground: "#FFF",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=co.clabs.valora",
    ios: "https://apps.apple.com/app/id1520414263?mt=8",
    qrCode: "https://valoraapp.com/",
  },
  createConnector: () => {
    const connector = getWalletConnectConnector({
      chains,
      projectId,
    });
    return {
      connector,
      mobile: {
        getUri: async () => {
          const uri = await getWalletConnectUri(connector, "2");
          return isAndroid()
            ? uri
            : `celo://wallet/wc?uri=${encodeURIComponent(uri)}`;
        },
      },
      qrCode: {
        getUri: () => getWalletConnectUri(connector, "2"),
        instructions: {
          learnMoreUrl: "https://valoraapp.com/learn",
          steps: [
            {
              description:
                "The crypto wallet to buy, send, spend, earn, and collect NFTs on the Celo blockchain.",
              step: "install",
              title: "Open the Valora app",
            },
            {
              description:
                "After you scan, a connection prompt will appear for you to connect your wallet.",
              step: "scan",
              title: "Tap the scan button",
            },
          ],
        },
      },
    };
  },
});
