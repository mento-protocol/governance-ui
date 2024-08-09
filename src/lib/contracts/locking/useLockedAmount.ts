"use client";
import { useAccount, useReadContract } from "wagmi";
import { useContracts } from "@/lib/contracts/useContracts";

import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { LockingABI } from "@/lib/abi/Locking";

export type TokenBalance = {
  decimals: number;
  value: bigint;
  symbol: string;
  formatted: string;
};

export const useLockedAmount = () => {
  const {
    Locking: { address: veTokenAddress },
  } = useContracts();
  const ensuredChainId = useEnsureChainId();

  const { address } = useAccount();

  return useReadContract({
    address: veTokenAddress,
    abi: LockingABI,
    functionName: "locked",
    args: address && [address],
    chainId: ensuredChainId,
  });
};

export default useLockedAmount;
