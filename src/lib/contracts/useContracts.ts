import { useAccount, useChains } from "wagmi";
import { MentoChain, MentoChainContracts } from "@/lib/types";
import { Celo } from "@/config/chains";

export const useContracts = (): MentoChainContracts => {
  const chains = useChains();
  const { isConnected, chainId } = useAccount();

  return isConnected
    ? (chains.find((chain) => chain.id === chainId) as MentoChain).contracts
    : Celo.contracts;
};
