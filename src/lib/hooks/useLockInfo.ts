import { useUnlockedMento } from "./../contracts/locking/useUnlockedMento";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import useLockedAmount from "@/lib/contracts/locking/useLockedAmount";
import React from "react";
import useTokens from "@/lib/contracts/useTokens";
import useLockingWeek from "../contracts/locking/useLockingWeek";
import { formatUnits } from "viem";

const formatNumber = (value: bigint | undefined, decimals: number): string =>
  Number(formatUnits(value ?? BigInt(0), decimals)).toFixed(3);

export const useLockInfo = (address: string | undefined) => {
  const { locks, refetch } = useLocksByAccount({ account: address! });

  const { data: unlockedMento, isLoading: isUnlockedMentoLoading } =
    useUnlockedMento();
  const { mentoContractData, veMentoContractData, isBalanceLoading } =
    useTokens();
  const { data: lockedBalance, isLoading: isLockedAmountLoading } =
    useLockedAmount();
  const { currentWeek: currentLockingWeek, isLoading: isCurrentWeekLoading } =
    useLockingWeek();

  const lock = locks.toSorted((a, b) => b.lockId - a.lockId)[0];
  const activeLocks = React.useMemo(() => {
    if (!locks) {
      return [];
    }
    return locks
      .filter((lock) => {
        return lock.expiration > new Date();
      })
      .filter((lock) => lock?.relocked !== true);
  }, [locks]);

  const hasMultipleLocks = React.useMemo(() => {
    return activeLocks.length > 1;
  }, [activeLocks]);

  const isLockExtendible = React.useMemo(() => {
    if (
      !currentLockingWeek ||
      isNaN(lock?.slope ?? 0) ||
      isNaN(lock?.cliff ?? 0) ||
      isNaN(lock?.time ?? 0) ||
      activeLocks.length > 1
    ) {
      return false;
    }
    const weeksPassed = Number(currentLockingWeek) - lock?.time;
    return weeksPassed > 1;
  }, [
    activeLocks.length,
    currentLockingWeek,
    lock?.cliff,
    lock?.slope,
    lock?.time,
  ]);

  return {
    isLockExtendible,
    isLoading:
      isCurrentWeekLoading ||
      isUnlockedMentoLoading ||
      isBalanceLoading ||
      isLockedAmountLoading,
    unlockedMento: formatNumber(unlockedMento, mentoContractData.decimals),
    lockedBalance: formatNumber(lockedBalance, veMentoContractData.decimals),
    hasLock: locks.length > 0,
    hasActiveLock: activeLocks.length > 0,
    activeLocks,
    hasMultipleLocks,
    allLocks: locks,
    lock,
    refetch,
  };
};
