"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Address, erc20Abi } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";
import { useContracts } from "../useContracts";

interface UseAllowance {
  chainId: number | undefined;
  owner: Address | undefined;
  spender: Address | undefined;
  enabled?: boolean;
}

export const useAllowance = ({
  chainId,
  owner,
  spender,
  enabled = true,
}: UseAllowance) => {
  const queryClient = useQueryClient();
  const contracts = useContracts();

  const query = useReadContract({
    chainId,
    address: contracts.MentoToken.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner as Address, spender as Address],
    query: {
      enabled: Boolean(owner && spender && enabled && chainId),
    },
  });

  const { data: blockNumber } = useBlockNumber({
    chainId: chainId,
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
