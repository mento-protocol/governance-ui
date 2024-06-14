"use client";
import { useCallback } from "react";
import * as mento from "@mento-protocol/mento-sdk";
import { useAccount, useClient, useConfig } from "wagmi";
import { Alfajores, Celo } from "@/config/chains";
import { getConnectorClient } from "wagmi/actions";
import { watchAsset } from "viem/actions";

export const useAddTokens = () => {
  const { chainId } = useAccount();
  const client = useClient();
  const config = useConfig();

  const addMento = useCallback(async () => {
    const connectorClient = await getConnectorClient(config);

    return await watchAsset(connectorClient, {
      type: "ERC20",
      options: {
        address:
          mento.addresses[
            chainId !== Celo.id || chainId !== Alfajores.id ? Celo.id : chainId
          ].MentoToken,
        symbol: "MENTO",
        decimals: 18,
      },
    });
  }, [chainId, config]);

  const addVeMento = useCallback(async () => {
    if (!chainId || !client?.request) return;
    const connectorClient = await getConnectorClient(config);

    return await watchAsset(connectorClient, {
      type: "ERC20",
      options: {
        address:
          mento.addresses[
            chainId !== Celo.id || chainId !== Alfajores.id ? Celo.id : chainId
          ].Locking,
        symbol: "veMENTO",
        decimals: 18,
      },
    });
  }, [chainId, client?.request, config]);

  return {
    addMento,
    addVeMento,
  };
};
