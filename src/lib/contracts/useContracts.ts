import { useAccount, useChains } from "wagmi";
import { MentoChain, MentoChainContracts } from "@/lib/types";
import { Celo, Alfajores } from "@/config/chains";
import { useEnsureChain } from "@/lib/hooks/useEnsureChain";

export const useContracts = (): MentoChainContracts => {
  const chains = useChains();
  const { isConnected, chainId } = useAccount();
  useEnsureChain();

  return isConnected && (chainId === Celo.id || chainId === Alfajores.id)
    ? (chains.find((chain) => chain.id === chainId) as MentoChain).contracts
    : Celo.contracts;
};
