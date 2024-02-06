import { useMemo } from "react";
import { useChainId, useConfig } from "wagmi";
import { MentoChain, MentoChainContracts } from "../types";

export const useContracts = (): MentoChainContracts | undefined => {
  const config = useConfig();
  const chainId = useChainId();

  const contracts = useMemo(() => {
    const chain = config.chains.find(
      (chain) => chain.id === chainId,
    ) as MentoChain;

    return chain?.contracts;
  }, [chainId, config.chains]);

  return contracts;
};
