import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { Address } from "viem";

const useRelockMento = () => {
  const contracts = useContracts();
  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const relockMento = useCallback(
    (
      id: bigint,
      newDelegate: Address,
      newAmount: bigint,
      newSlope: number,
      newCliff: number,
      onSuccess?: () => void,
    ) => {
      writeContract({
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "relock",
        args: [id, newDelegate, newAmount, newSlope, newCliff],
      });
    },
    [contracts.Locking.address, writeContract],
  );

  return {
    hash: data,
    relockMento,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useRelockMento;
