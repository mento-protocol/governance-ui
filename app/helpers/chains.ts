import { Chain } from "@rainbow-me/rainbowkit";
import { celoAlfajores } from "viem/chains";
import { celo } from "viem/chains";

export const Celo: Chain = {
  ...celo,
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/celo.svg",
  iconBackground: "#fff",
};

export const Alfajores: Chain = {
  ...celoAlfajores,
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/alfajores.svg",
  iconBackground: "#fff",
};

export const Baklava: Chain = {
  id: 62320,
  name: "Baklava",
  network: "Baklava Testnet",
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/baklava.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "CELO",
    symbol: "B-CELO",
  },
  rpcUrls: {
    default: {
      http: ["https://baklava-forno.celo-testnet.org"],
    },
    public: {
      http: ["https://baklava-forno.celo-testnet.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/baklava",
    },
    etherscan: {
      name: "Celo Explorer",
      url: "https://explorer.celo.org/baklava",
    },
  },
  testnet: true,
};
