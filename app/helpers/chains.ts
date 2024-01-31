import { Address } from "viem";
import { celoAlfajores } from "viem/chains";
import { celo } from "viem/chains";
import { addresses, ContractAddresses } from "@mento-protocol/mento-sdk";
import { MentoChain, MentoChainContracts } from "../types";

export const Celo: MentoChain = {
  ...celo,
  contracts: {
    ...celo.contracts,
    ...transformToChainContracts(addresses[celo.id]),
  },
};

export const Alfajores: MentoChain = {
  ...celoAlfajores,
  contracts: {
    ...celoAlfajores.contracts,
    ...transformToChainContracts(addresses[celoAlfajores.id]),
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
    ...transformToChainContracts(addresses[celoAlfajores.id]),
  },
};

/**
 * Transform the mento contract addresses to the format used by Viem.
 * @param contractAddresses The mento contract addresses.
 * @returns The transformed mento contract addresses.
 */
function transformToChainContracts(
  contractAddresses: ContractAddresses,
): MentoChainContracts {
  const chainContracts: Partial<MentoChainContracts> = {};

  Object.keys(contractAddresses).forEach((key) => {
    const contractKey = key as keyof ContractAddresses;
    chainContracts[contractKey] = {
      address: contractAddresses[contractKey] as Address,
    };
  });

  return chainContracts as MentoChainContracts;
}
