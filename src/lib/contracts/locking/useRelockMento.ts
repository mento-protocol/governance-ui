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
import useLockedAmount from "./useLockedAmount";
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
  const { data: lockedBalance } = useLockedAmount();

  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();

  const lockingArgs = React.useMemo(() => {
    if (!lock || !lockedBalance || typeof newSlope !== "number") return null;

    return [
      lock.lockId,
      newDelegate ?? lock.owner?.id,
      newAmount ?? lockedBalance,
      newSlope,
      newCliff ?? lock.cliff,
    ] as const;
  }, [lock, lockedBalance, newAmount, newCliff, newDelegate, newSlope]);

  const lockingConfig = React.useMemo(() => {
    if (!lockingArgs) return null;

    return {
      address: contracts.Locking.address,
      abi: LockingABI,
      functionName: "relock",
      args: lockingArgs,
    } as const;
  }, [contracts.Locking.address, lockingArgs]);

  const simulation = useSimulateContract(lockingConfig ?? {});

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const relockMento = useCallback(() => {
    if (!lockingConfig) return;
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
