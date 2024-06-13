"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Address, erc20Abi } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";
import { useContracts } from "../useContracts";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

interface UseAllowance {
  owner: Address | undefined;
  spender: Address | undefined;
  enabled?: boolean;
}

export const useAllowance = ({
  owner,
  spender,
  enabled = true,
}: UseAllowance) => {
  const queryClient = useQueryClient();
  const contracts = useContracts();
  const ensuredChainId = useEnsureChainId();

  const query = useReadContract({
    chainId: ensuredChainId,
    address: contracts.MentoToken.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner as Address, spender as Address],
    query: {
      enabled: Boolean(owner && spender && enabled && ensuredChainId),
    },
  });

  const { data: blockNumber } = useBlockNumber({
    chainId: ensuredChainId,
    watch: true,
  });

  useEffect(() => {
    if (blockNumber) {
      queryClient.invalidateQueries(
        { queryKey: query.queryKey },
        { cancelRefetch: false },
      );
    }
  }, [blockNumber, queryClient, query.queryKey]);

  return query;
};
