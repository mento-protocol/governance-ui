import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { Address } from "viem";

const useLockMento = () => {
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
  const lockMento = useCallback(
    (
      account: Address,
      delegate: Address,
      amount: number,
      slope: number,
      cliff: number,
    ) => {
      writeContract({
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "lock",
        args: [account, delegate, BigInt(amount), slope, cliff],
      } as const);
    },
    [contracts.Locking.address, writeContract],
  );

  return {
    hash: data,
    lockMento,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useLockMento;
