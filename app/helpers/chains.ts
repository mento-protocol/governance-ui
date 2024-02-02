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
    //TODO: REMOVE ME POST SUBGRAPH UPDATE PLS :'(
    //      Here we override the MentoGovernor and Locking contract addresses
    //      To use the versions deployed by @bowd that have proposal and have
    //      been indexed by the subgraph.
    //      This should be removed once the subgraph is updated and the contracts
    //      Have been seeded with some test proposals.
    //      See comment here:
    //      https://github.com/mento-protocol/governance-ui/pull/50#issue-2109977351
    MentoGovernor: {
      address: "0xc1d32e3bac67b28d31d7828c8ff160e44c37be1c",
    },
    Locking: {
      address: "0x8E1707307f04eC9742AD3d8e6D88AE5F506F83cA",
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
    ...transformToChainContracts(addresses[62320]),
  },
};

/**
 * Transforms the specified Mento contract addresses to the format used by Viem.
 * @param contractAddresses The Mento contract addresses to be transformed.
 * @returns Mento contract addresses in the format used by Viem.
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
