"use client";
import { Alfajores, Celo } from "@/config/chains";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { IS_PROD } from "../../middleware";

export const useEnsureChain = () => {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected) {
      if (
        (IS_PROD && chainId !== Celo.id) ||
        (!IS_PROD && chainId !== Celo.id && chainId !== Alfajores.id)
      ) {
        switchChain({
          chainId: Celo.id,
        });
      }
    }
  }, [chainId, isConnected, switchChain]);
};
