import React, { useState, useMemo } from "react";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import { MAX_LOCKING_DURATION_WEEKS } from "../constants";
import { ExtendedLock, useLockInfo } from "@/lib/hooks/useLockInfo";
import { differenceInWeeks } from "date-fns";
import { useAccount } from "wagmi";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import * as Sentry from "@sentry/nextjs";

export default function useRelockForm(
  lock: ExtendedLock,
  onLockSuccess: () => void,
) {
  const { address } = useAccount();

  const { currentWeek: currentLockingWeek } = useLockingWeek();
  const { refetch } = useLocksByAccount({ account: address! });
  const { activeLocks } = useLockInfo(address);

  const [expirationDate, setExpirationDate] = useState<Date>(lock?.expiration);

  const newSlope = React.useMemo(() => {
    if (!expirationDate) return 0;

    const currentSlope = lock?.slope;
    const weeksPassed = Number(currentLockingWeek) - lock?.time;
    const weeksAdded = differenceInWeeks(expirationDate, lock?.expiration);
    return Math.min(
      currentSlope - weeksPassed + weeksAdded,
      MAX_LOCKING_DURATION_WEEKS,
    );
  }, [
    currentLockingWeek,
    expirationDate,
    lock?.expiration,
    lock?.slope,
    lock?.time,
  ]);

  const { relockMento, isAwaitingUserSignature, isConfirming, error } =
    useRelockMento({
      newSlope,
      lock,
      onSuccess: () => {
        onLockSuccess();
        refetch();
      },
      onError: (error) => {
        Sentry.captureException(error);
      },
    });

  const isLockExtendible = useMemo(() => {
    if (
      !currentLockingWeek ||
      isNaN(lock?.slope) ||
      isNaN(lock?.cliff) ||
      isNaN(lock?.time) ||
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

  const maxExtensionWeeks = useMemo(() => {
    const weeksPassed = Number(currentLockingWeek) - lock?.time;
    return Math.max(MAX_LOCKING_DURATION_WEEKS - lock?.slope + weeksPassed, 0);
  }, [currentLockingWeek, lock?.slope, lock?.time]);

  const handleDateSelection = (date: Date) => setExpirationDate(date);
  const handleRelockSubmit = () => relockMento();

  return {
    expirationDate,
    isLockExtendible,
    maxExtensionWeeks,
    isPending: isAwaitingUserSignature,
    handleDateSelection,
    handleRelockSubmit,
    isConfirming,
    error,
  };
}
