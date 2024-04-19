import { addresses, ContractAddresses } from "@mento-protocol/mento-sdk";
import { Address, defineChain } from "viem";
import { celo, celoAlfajores } from "wagmi/chains";
import { MentoChain, MentoChainContracts } from "@/lib/types";

export const Celo: MentoChain = defineChain({
  ...celo,
  blockExplorers: {
    default: {
      name: "Celoscan",
      url: "https://celoscan.io",
      apiUrl: "https://api.celoscan.io/api",
    },
  },
  contracts: {
    ...celo.contracts,
    ...transformToChainContracts(addresses[celo.id]),
  },
});

export const Alfajores: MentoChain = defineChain({
  ...celoAlfajores,
  blockExplorers: {
    default: {
      name: "Celoscan",
      url: "https://alfajores.celoscan.io",
      apiUrl: "https://api-alfajores.celoscan.io/api",
    },
  },
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
    MentoToken: {
      address: "0xc88f553DC20fc78ce554bfF97C2F4a4E5BDB0134",
    },
  },
});

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
