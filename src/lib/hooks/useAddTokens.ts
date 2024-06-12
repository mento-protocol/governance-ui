"use client";
import { useCallback } from "react";
import * as mento from "@mento-protocol/mento-sdk";
import { useAccount } from "wagmi";
import { Alfajores, Celo } from "@/config/chains";

export const useAddTokens = () => {
  const { chainId } = useAccount();

  const addMento = useCallback(async () => {
    if (!chainId) return;
    const wasAdded = await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address:
            mento.addresses[
              chainId !== Celo.id || chainId !== Alfajores.id
                ? Celo.id
                : chainId
            ].MentoToken, // The address that the token is at.
          symbol: "MENTO", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
        },
      },
    });
    console.log(`Mento token added: ${wasAdded}`);
  }, [chainId]);

  const addVeMento = useCallback(async () => {
    if (!chainId) return;
    const wasAdded = await (window as any).ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address:
            mento.addresses[
              chainId !== Celo.id || chainId !== Alfajores.id
                ? Celo.id
                : chainId
            ].Locking, // The address that the token is at.
          symbol: "veMENTO", // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
        },
      },
    });
    console.log(`veMento token added: ${wasAdded}`);
  }, [chainId]);

  return {
    addMento,
    addVeMento,
  };
};
