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
import useLockingWeek from "./useLockingWeek";
import { MAX_LOCKING_DURATION_WEEKS } from "@/components/_shared/mento-lock/constants";
import { differenceInWeeks } from "date-fns";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
interface RelockMentoParams {
  newDelegate?: Address;
  newAmount?: bigint;
  newExpirationDate: Date;
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
  newExpirationDate,
  onError,
  onSuccess,
}: RelockMentoParams) => {
  const contracts = useContracts();
  const { veMentoBalance } = useTokens();
  const { currentWeek: currentLockingWeek } = useLockingWeek();
  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();

  const newSlope = React.useMemo(() => {
    if (!newExpirationDate) return 0;

    const currentSlope = lock?.slope;
    const weeksPassed = Number(currentLockingWeek) - lock?.time;
    const weeksAdded = differenceInWeeks(newExpirationDate, lock?.expiration);
    return Math.min(
      currentSlope - weeksPassed + weeksAdded,
      MAX_LOCKING_DURATION_WEEKS,
    );
  }, [
    currentLockingWeek,
    lock?.expiration,
    lock?.slope,
    lock?.time,
    newExpirationDate,
  ]);

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
