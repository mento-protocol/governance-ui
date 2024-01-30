import { Chain, celo, celoAlfajores } from "viem/chains";
import { addresses, ContractAddresses } from "@mento-protocol/mento-sdk";
import { Address } from "viem";

interface ChainContract {
  address: Address;
}

function transformToChainContracts(contractAddresses: {
  [key: string]: string;
}): { [key: string]: ChainContract } {
  // Create the chain contracts object
  const chainContracts: { [key: string]: ChainContract } = {};

  // Loop through the contract addresses obj to get the contract names
  Object.keys(contractAddresses).forEach((key) => {
    // Add the contract name to the chain contracts object with its address
    chainContracts[key] = {
      address: contractAddresses[key] as Address,
    };
  });

  return chainContracts;
}

export const Celo: Chain = {
  ...celo,
  contracts: {
    ...celo.contracts,
    ...transformToChainContracts(addresses[celo.id]),
  },
};

export const Alfajores: Chain = {
  ...celoAlfajores,
  contracts: {
    ...celoAlfajores.contracts,
    ...transformToChainContracts(addresses[celoAlfajores.id]),
  },
};

export const Baklava: Chain = {
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
    ...transformToChainContracts(addresses[celoAlfajores.id]),
  },
};
