import { Address, ChainContract } from "viem";
import { Chain, celoAlfajores } from "viem/chains";
import { celo } from "viem/chains";
import { addresses } from "@mento-protocol/mento-sdk";

export type MentoChain = Chain & {
  contracts: Chain["contracts"] & {
    mento: ChainContract;
    governance: ChainContract;
    locking: ChainContract;
  };
};

export const Celo: MentoChain = {
  ...celo,
  contracts: {
    ...celo.contracts,
    governance: {
      address: addresses[celo.id].MentoGovernor as Address,
      blockCreated: 0,
    },
    mento: {
      address: addresses[celo.id].MentoToken as Address,
      blockCreated: 0,
    },
    locking: {
      address: addresses[celo.id].Locking as Address,
      blockCreated: 0,
    },
  },
};

export const Alfajores: MentoChain = {
  ...celoAlfajores,
  contracts: {
    ...celoAlfajores.contracts,
    governance: {
      address: addresses[celoAlfajores.id].MentoGovernor as Address,
      blockCreated: 21963087,
    },
    mento: {
      address: addresses[celoAlfajores.id].MentoToken as Address,
      blockCreated: 21963087,
    },
    locking: {
      address: addresses[celoAlfajores.id].Locking as Address,
      blockCreated: 21963087,
    },
  },
};

export const Baklava: MentoChain = {
  id: 62320,
  name: "Baklava",
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
      address: addresses[62320].MentoGovernor as Address,
      blockCreated: 21963087,
    },
    mento: {
      address: addresses[62320].MentoToken as Address,
      blockCreated: 21963087,
    },
    locking: {
      address: addresses[62320].Locking as Address,
      blockCreated: 21963087,
    },
  },
};
