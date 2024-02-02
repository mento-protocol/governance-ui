import { Chain, celoAlfajores } from "viem/chains";
import { celo } from "viem/chains";

export const Celo: Chain = {
  ...celo,
  // iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/celo.svg",
  // iconBackground: "#fff",
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
    timelock: {
      address: "0x0",
      blockCreated: 0,
    },
    airgrab: {
      address: "0x0",
      blockCreated: 0,
    },
    emission: {
      address: "0x0",
      blockCreated: 0,
    },
  },
};

export const Alfajores: Chain = {
  ...celoAlfajores,
  // iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/alfajores.svg",
  // iconBackground: "#fff",
  contracts: {
    ...celoAlfajores.contracts,
    governance: {
      address: "0x84382a356c1Dc6ada21997E64dc72e5a7AcF5826",
      blockCreated: 21963087,
    },
    mento: {
      address: "0x53De3F938c64baB8C621c8A3C5000b385afE2404",
      blockCreated: 21963087,
    },
    locking: {
      address: "0x65a1271ce7B2ec8D564A4Bc752E13A36a46e81B8",
      blockCreated: 21963087,
    },
    timelock: {
      address: "0x2AFC4a1e7928Fb3bfC81076740d3142FF8B1DE05",
      blockCreated: 21963087,
    },
    airgrab: {
      address: "0x281fA47f59456fA04DF699539fA4b1F25e7769A3",
      blockCreated: 21963087,
    },
    emission: {
      address: "0x8D1267bFf3f8166AEB2B58217b74188d1fe326f3",
      blockCreated: 21963087,
    },
  },
};

export const Baklava: Chain = {
  id: 62320,
  name: "Baklava",
  // network: "Baklava Testnet",
  // iconUrl: "https://rainbowkit-with-celo.vercel.app/icons/baklava.svg",
  // iconBackground: "#fff",
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
    timelock: {
      address: "0x0",
      blockCreated: 0,
    },
    airgrab: {
      address: "0x0",
      blockCreated: 0,
    },
    emission: {
      address: "0x0",
      blockCreated: 0,
    },
  },
};
