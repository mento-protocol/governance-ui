import { Alfajores, Celo } from "@/config/chains";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";

export const useEnsureChain = () => {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    if (isConnected) {
      if (chainId !== Celo.id && chainId !== Alfajores.id) {
        switchChain({
          chainId: Celo.id,
        });
      }
    }
  }, [chainId, isConnected, switchChain]);
};
