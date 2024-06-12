"use client";
import { Alfajores, Celo } from "@/config/chains";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useAccount, useSwitchChain, createStorage } from "wagmi";
import { IS_PROD } from "../../middleware";

export function EnsureChain({ children }: { children: ReactNode }) {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();

  const [switching, setSwitching] = useState(false);

  const setUpAndSwitch = useCallback(async () => {
    const storage = createStorage({ storage: localStorage });
    const recentConnectorId = await storage.getItem("recentConnectorId");
    if (recentConnectorId === "me.rainbow") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xa4ec",
            rpcUrls: [Celo.rpcUrls.default.http],
            chainName: "Celo",
            nativeCurrency: {
              name: "CELO",
              symbol: "CELO",
              decimals: 18,
            },
            blockExplorerUrls: [Celo.blockExplorers?.default.apiUrl],
          },
        ],
      });
    }
    switchChain({
      chainId: Celo.id,
    });
    setSwitching(false);
  }, [switchChain]);

  useEffect(() => {
    if (isConnected) {
      if (
        (IS_PROD && chainId !== Celo.id) ||
        (!IS_PROD && chainId !== Celo.id && chainId !== Alfajores.id)
      ) {
        if (!switching) {
          setSwitching(true);
        }
      }
    }
  }, [chainId, isConnected, setUpAndSwitch, switchChain, switching]);

  useEffect(() => {
    if (switching) {
      setUpAndSwitch();
    }
  }, [setUpAndSwitch, switching]);

  return children;
}
