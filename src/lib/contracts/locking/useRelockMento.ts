import React, { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { Address } from "viem";
import { WriteContractErrorType } from "wagmi/actions";
import useTokens from "../useTokens";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
interface RelockMentoParams {
  newDelegate?: Address;
  newAmount?: bigint;
  newSlope: number;
  newCliff?: number;
  onSuccess?: () => void;
  onError?: (error?: WriteContractErrorType) => void;
  lock: ExtendedLock;
}

const useRelockMento = ({
  lock,
  newAmount,
  newCliff,
  newDelegate,
  onError,
  onSuccess,
  newSlope,
}: RelockMentoParams) => {
  const contracts = useContracts();
  const { veMentoBalance } = useTokens();

  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();

  const lockingArgs = React.useMemo(() => {
    return [
      lock?.lockId,
      newDelegate ?? lock?.owner?.id,
      newAmount ?? veMentoBalance.value,
      newSlope,
      newCliff ?? lock?.cliff,
    ] as const;
  }, [
    lock?.cliff,
    lock?.lockId,
    lock?.owner?.id,
    newAmount,
    newCliff,
    newDelegate,
    newSlope,
    veMentoBalance.value,
  ]);

  const lockingConfig = React.useMemo(() => {
    return {
      address: contracts.Locking.address,
      abi: LockingABI,
      functionName: "relock",
      args: lockingArgs,
    } as const;
  }, [contracts.Locking.address, lockingArgs]);

  const simulation = useSimulateContract(lockingConfig);

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const relockMento = useCallback(() => {
    writeContract(lockingConfig, {
      onSuccess,
      onError,
    });
  }, [lockingConfig, onError, onSuccess, writeContract]);

  return {
    canRelock: simulation.isSuccess,
    hash: data,
    relockMento,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useRelockMento;
