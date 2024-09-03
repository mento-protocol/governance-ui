import { useUnlockedMento } from "./../contracts/locking/useUnlockedMento";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import useLockedAmount from "@/lib/contracts/locking/useLockedAmount";
import React from "react";
import useTokens from "@/lib/contracts/useTokens";
import useLockingWeek from "../contracts/locking/useLockingWeek";
import { formatUnits } from "viem";
import {
  addDays,
  addWeeks,
  isWednesday,
  nextWednesday,
  startOfWeek,
  subWeeks,
} from "date-fns";
import type { Lock } from "@/lib/graphql/subgraph/generated/subgraph";

export interface ExtendedLock extends Lock {
  expiration: Date;
}

function calculateExpirationDate(
  currentWeek: number,
  weekLocked: number,
  cliff: number,
  slope: number,
): Date {
  // Calculate weeks passed since lock
  const weeksPassed = currentWeek - weekLocked;

  // Calculate remaining weeks in the vesting schedule
  const remainingWeeks = cliff + slope - weeksPassed;

  // Calculate the initial lock date by subtracting weeks passed from the start of the current week
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 3 });
  const initialLockDate = nextWednesday(
    subWeeks(startOfCurrentWeek, weeksPassed),
  );

  // Add the remaining weeks to the initial lock date
  let expirationDate = addWeeks(initialLockDate, remainingWeeks);

  // Ensure the expiration date is the next Wednesday if it's already a Wednesday,
  // otherwise move to the Wednesday after
  expirationDate = isWednesday(expirationDate)
    ? nextWednesday(addDays(expirationDate, 1))
    : nextWednesday(expirationDate);

  return expirationDate;
}

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

  const lock: ExtendedLock | null = React.useMemo(() => {
    if (!locks) {
      return null;
    }

    const lastLock = locks.toSorted((a, b) => b.lockId - a.lockId)[0];
    if (
      isCurrentWeekLoading ||
      currentLockingWeek === undefined ||
      currentLockingWeek === 0n
    ) {
      return null;
    }
    return {
      ...lastLock,
      expiration: calculateExpirationDate(
        Number(currentLockingWeek),
        lastLock?.time,
        lastLock?.slope,
        lastLock?.cliff,
      ),
    };
  }, [currentLockingWeek, isCurrentWeekLoading, locks]);

  const activeLocks = React.useMemo(() => {
    if (!locks) {
      return [];
    }
    return locks
      .filter((lock) => {
        const expiration = calculateExpirationDate(
          Number(currentLockingWeek),
          lock?.time,
          lock?.slope,
          lock?.cliff,
        );
        return expiration > new Date();
      })
      .filter((lock) => lock?.relocked !== true);
  }, [currentLockingWeek, locks]);

  const hasMultipleLocks = React.useMemo(() => {
    return activeLocks.length > 1;
  }, [activeLocks]);

  return {
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
