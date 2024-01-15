import { Chain } from "@rainbow-me/rainbowkit";
import { celoAlfajores } from "viem/chains";
import { celo } from "viem/chains";

export const Celo: Chain = {
  ...celo,
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/celo.svg",
  iconBackground: "#fff",
  contracts: {
    ...celo.contracts,
    governance: {
      address: "0x0",
      blockCreated: 0,
    },
    mento: {
      address: "0x0",
      blockCreated: 0,
    },
    locking: {
      address: "0x0",
      blockCreated: 0,
    },
  },
};

export const Alfajores: Chain = {
  ...celoAlfajores,
  iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/alfajores.svg",
  iconBackground: "#fff",
  contracts: {
    ...celoAlfajores.contracts,
    governance: {
      address: "0xc1d32e3bac67b28d31d7828c8ff160e44c37be1c",
      blockCreated: 21963087,
    },
    mento: {
      address: "0xc88f553dc20fc78ce554bff97c2f4a4e5bdb0134",
      blockCreated: 21963087,
    },
    locking: {
      address: "0x8e1707307f04ec9742ad3d8e6d88ae5f506f83ca",
      blockCreated: 21963087,
    },
  },
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
  contracts: {
    governance: {
      address: "0x0",
      blockCreated: 0,
    },
    mento: {
      address: "0x0",
      blockCreated: 0,
    },
    locking: {
      address: "0x0",
      blockCreated: 0,
    },
  },
};
