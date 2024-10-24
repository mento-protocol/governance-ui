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
import * as Sentry from "@sentry/nextjs";

interface RelockMentoParams {
  newDelegate?: Address;
  additionalAmountToLock?: bigint;
  newSlope: number;
  newCliff?: number;
  onSuccess?: () => void;
  onError?: (error?: WriteContractErrorType) => void;
  lock: ExtendedLock;
}

const useRelockMento = ({
  lock,
  additionalAmountToLock,
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

    const newTotalLockedAmount = (additionalAmountToLock ?? 0n) + lockedBalance;
    return [
      lock.lockId,
      newDelegate ?? lock.owner?.id,
      newTotalLockedAmount,
      newSlope,
      newCliff ?? lock.cliff,
    ] as const;
  }, [
    lock,
    lockedBalance,
    additionalAmountToLock,
    newCliff,
    newDelegate,
    newSlope,
  ]);

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
      onError: (error) => {
        Sentry.captureException(error, {
          data: {
            function: "useRelockMento",
            lockId: lock.lockId,
            user: lock.owner?.id,
            contract: contracts.Locking.address,
            contractArgs: JSON.stringify(lockingArgs),
          },
        });
        onError?.(error);
      },
    });
  }, [
    contracts.Locking.address,
    lock.lockId,
    lock.owner?.id,
    lockingArgs,
    lockingConfig,
    onError,
    onSuccess,
    writeContract,
  ]);

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
