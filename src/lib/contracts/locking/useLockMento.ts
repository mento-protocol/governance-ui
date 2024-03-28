import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { Address } from "viem";
import { WriteContractErrorType } from "wagmi/actions";

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
      amount: bigint,
      slope: number,
      cliff: number,
      onSuccess?: () => void,
      onError?: (error?: WriteContractErrorType) => void,
    ) => {
      writeContract(
        {
          address: contracts.Locking.address,
          abi: LockingABI,
          functionName: "lock",
          args: [account, delegate, amount, slope, cliff],
        },
        {
          onSuccess,
          onError,
        },
      );
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
