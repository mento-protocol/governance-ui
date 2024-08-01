import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import React, { useCallback } from "react";

export const useWithdraw = ({
  onConfirmation,
}: { onConfirmation?: () => void } = {}) => {
  const { writeContract, data, reset, isPending, error } = useWriteContract();
  const { Locking } = useContracts();
  const ensuredChainId = useEnsureChainId();

  const withdraw = useCallback(() => {
    writeContract({
      address: Locking.address,
      abi: LockingABI,
      functionName: "withdraw",
      chainId: ensuredChainId,
    });
  }, [Locking.address, ensuredChainId, writeContract]);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
      pollingInterval: 1000,
    });

  React.useEffect(() => {
    if (isConfirmed && onConfirmation) {
      onConfirmation();
      reset();
    }
  }, [isConfirmed, onConfirmation, reset]);

  return {
    withdraw,
    isPending,
    isConfirming,
    error,
  };
};
