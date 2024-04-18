import { useChainId, useConfig } from "wagmi";
import { MentoChain, MentoChainContracts } from "@/lib/types";
import { Celo } from "@/config/chains";

export const useContracts = (): MentoChainContracts => {
  const config = useConfig();
  const chainId = useChainId();

  return (
    (config.chains.find((chain) => chain.id === chainId) as MentoChain)
      .contracts || Celo.contracts
  );
};
