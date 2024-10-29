import { useState, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { nextWednesday, differenceInWeeks } from "date-fns";
import LockingHelper from "@/lib/helpers/locking";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
  MAX_LOCKING_DURATION_WEEKS,
} from "@/lib/constants/locking";
import { useLockInfo } from "@/lib/hooks/useLockInfo";

import { useAllowance } from "@/lib/contracts/mento/useAllowance";
import useApprove from "@/lib/contracts/mento/useApprove";
import { useContracts } from "@/lib/contracts/useContracts";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import {
  MANAGE_LOCK_TX_STATUS,
  MANAGE_LOCK_APPROVAL_STATUS,
} from "../manage-lock.provider";
import { toast } from "sonner";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";

export const useManageLockLogic = (lockToManage: LockWithExpiration) => {
  const {
    watch,
    setValue,
    formState: { isValid },
    reset: resetForm,
  } = useFormContext();
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [shouldUpdateLockingAmount, setShouldUpdateLockingAmount] =
    useState(false);

  const { address } = useAccount();
  const contracts = useContracts();
  const allowance = useAllowance({
    owner: address,
    spender: contracts.Locking.address,
  });
  const { currentWeek: currentLockingWeek } = useLockingWeek();
  const { refetch: refetchLockInfo, hasMultipleLocks } = useLockInfo(address);

  // Form values
  const additionalAmountToLock = watch(LOCKING_AMOUNT_FORM_KEY);
  const newExpirationDate = watch(LOCKING_DURATION_FORM_KEY);
  const parsedAdditionalAmountToLock = parseEther(additionalAmountToLock);

  // Form calendar calculations
  const maxExtensionWeeks = useMemo(
    () =>
      LockingHelper.calculateMaxExtensionWeeks(
        Number(currentLockingWeek),
        lockToManage.time,
        lockToManage.slope,
      ),
    [currentLockingWeek, lockToManage],
  );
  const disabledDays = useMemo(
    () => [
      { before: nextWednesday(lockToManage.expiration) },
      ...LockingHelper.getDaysExceptWednesday(),
    ],
    [lockToManage.expiration],
  );

  const newSlope = useMemo(() => {
    if (!newExpirationDate) return 0;
    const currentSlope = lockToManage?.slope;
    const weeksPassed = Number(currentLockingWeek) - lockToManage?.time;
    const weeksAdded = differenceInWeeks(
      newExpirationDate,
      lockToManage?.expiration,
    );
    return Math.min(
      currentSlope - weeksPassed + weeksAdded,
      MAX_LOCKING_DURATION_WEEKS,
    );
  }, [currentLockingWeek, lockToManage, newExpirationDate]);

  const relock = useRelockMento({
    lock: lockToManage,
    newSlope,
    additionalAmountToLock: parsedAdditionalAmountToLock,
    onConfirmation: () => {
      refetchLockInfo();
    },
  });

  const approve = useApprove({ onConfirmation: relock.relockMento });

  const needsApproval = useMemo(() => {
    if (parsedAdditionalAmountToLock === 0n) return false;
    if (!allowance.data) return true;
    return allowance?.data < parsedAdditionalAmountToLock;
  }, [allowance.data, parsedAdditionalAmountToLock]);

  const manageLockTxStatus = useMemo(() => {
    if (approve.error || relock.error) return MANAGE_LOCK_TX_STATUS.ERROR;
    if (approve.isAwaitingUserSignature || relock.isAwaitingUserSignature)
      return MANAGE_LOCK_TX_STATUS.AWAITING_SIGNATURE;
    if (approve.isConfirming)
      return MANAGE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX;
    if (relock.isConfirming) return MANAGE_LOCK_TX_STATUS.CONFIRMING_RELOCK_TX;
    return MANAGE_LOCK_TX_STATUS.UNKNOWN;
  }, [approve, relock]);

  const approvalStatus = useMemo(() => {
    return needsApproval
      ? MANAGE_LOCK_APPROVAL_STATUS.NOT_APPROVED
      : MANAGE_LOCK_APPROVAL_STATUS.APPROVED;
  }, [needsApproval]);

  const onDateSelection = useCallback(
    (date: Date) => {
      setValue(LOCKING_DURATION_FORM_KEY, date);
    },
    [setValue],
  );

  const manageLock = useCallback(
    ({
      onSuccess,
      onError,
    }: { onSuccess?: () => void; onError?: () => void } = {}) => {
      setIsTxModalOpen(true);
      if (!needsApproval) {
        relock.relockMento({
          onSuccess: () => {
            resetForm();
            setIsTxModalOpen(false);
            toast.success("Lock updated successfully");
            onSuccess?.();
          },
          onError,
        });
      } else {
        approve.approveMento(
          contracts.Locking.address,
          parsedAdditionalAmountToLock,
        );
      }
    },
    [
      needsApproval,
      approve,
      parsedAdditionalAmountToLock,
      relock,
      resetForm,
      contracts.Locking.address,
    ],
  );

  const resetAll = useCallback(() => {
    approve.reset();
    relock.reset();
    resetForm();
  }, [approve, relock, resetForm]);

  return {
    canManageLocks: !hasMultipleLocks,
    selectedDate: newExpirationDate,
    isValid,
    lockToManage,
    submit: manageLock,
    maxExtensionWeeks,
    disabledDays,
    onDateSelection,
    shouldUpdateLockingAmount,
    setShouldUpdateLockingAmount,
    reset: resetAll,
    retry: manageLock,
    approvalStatus,
    manageLockTxStatus,
    needsApproval,
    isTxModalOpen,
    setIsTxModalOpen,
    isAwaitingUserSignature:
      approve.isAwaitingUserSignature || relock.isAwaitingUserSignature,
    isSubmitting:
      approve.isConfirming ||
      relock.isConfirming ||
      approve.isAwaitingUserSignature ||
      relock.isAwaitingUserSignature,
  };
};
