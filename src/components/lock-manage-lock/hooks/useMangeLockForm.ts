import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import { date, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import LockingHelper from "@/lib/helpers/locking";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "@/lib/constants/locking";
import { addWeeks } from "date-fns";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";

export interface ManageLockFormData {
  [LOCKING_AMOUNT_FORM_KEY]: string;
  [LOCKING_DURATION_FORM_KEY]: Date;
}

export const useManageLockForm = (lock: LockWithExpiration) => {
  const { mentoBalance } = useTokens();
  const { currentWeek, error: currentWeekError } = useLockingWeek();

  const maxExtensionDate = useMemo(() => {
    if (currentWeekError) return 0;
    const maxExtensionWeeks = LockingHelper.calculateMaxExtensionWeeks(
      Number(currentWeek),
      lock?.time,
      lock?.slope,
    );

    return addWeeks(lock?.expiration ?? new Date(), maxExtensionWeeks);
  }, [
    currentWeekError,
    currentWeek,
    lock?.time,
    lock?.slope,
    lock?.expiration,
  ]);

  const minExtensionDate = useMemo(() => {
    return addWeeks(lock?.expiration ?? new Date(), 1);
  }, [lock?.expiration]);

  const validationSchema = React.useMemo(() => {
    return object({
      [LOCKING_AMOUNT_FORM_KEY]: string()
        .required("Amount is required")
        .test("isNumber", "Invalid number", (value) => !isNaN(Number(value)))
        .test(
          "max",
          `Amount exceeds balance`,
          (value) =>
            Number(value) <=
            Number(formatUnits(mentoBalance.value, mentoBalance.decimals)),
        ),
      [LOCKING_DURATION_FORM_KEY]: date()
        .required()
        .typeError("Invalid Date")
        .min(minExtensionDate)
        .max(maxExtensionDate),
    });
  }, [
    maxExtensionDate,
    mentoBalance.decimals,
    mentoBalance.value,
    minExtensionDate,
  ]);

  return useForm<ManageLockFormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      [LOCKING_AMOUNT_FORM_KEY]: "0",
      [LOCKING_DURATION_FORM_KEY]: addWeeks(lock?.expiration ?? new Date(), 1),
    },
  });
};
