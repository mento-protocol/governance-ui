import {
  getWalletConnectConnector,
  RainbowKitWalletConnectParameters,
  type Wallet,
} from "@rainbow-me/rainbowkit";

export function isAndroid(): boolean {
  return (
    typeof navigator !== "undefined" && /android/i.test(navigator.userAgent)
  );
}

export interface DefaultWalletOptions {
  projectId: string;
  walletConnectParameters?: RainbowKitWalletConnectParameters;
}

export const valora = ({
  projectId,
  walletConnectParameters,
}: DefaultWalletOptions): Wallet => ({
  id: "valora",
  name: "Valora",
  iconUrl:
    // secretlint-disable-next-line
    "https://registry.walletconnect.com/api/v1/logo/md/d01c7758d741b363e637a817a09bcf579feae4db9f5bb16f599fdd1f66e2f974",
  iconBackground: "#FFF",
  downloadUrls: {
    android: "https://play.google.com/store/apps/details?id=co.clabs.valora",
    ios: "https://apps.apple.com/app/id1520414263?mt=8",
    qrCode: "https://valoraapp.com/",
  },
  mobile: {
    getUri: (uri) => {
      return isAndroid()
        ? uri
        : `celo://wallet/wc?uri=${encodeURIComponent(uri)}`;
    },
  },
  qrCode: {
    getUri: (uri: string) => uri,
  },
  createConnector: getWalletConnectConnector({
    projectId,
    walletConnectParameters,
  }),
});
