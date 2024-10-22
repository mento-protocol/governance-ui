import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import { date, InferType, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
import LockingHelper from "@/lib/helpers/locking";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "@/lib/constants/locking";

export const useManageLockForm = (lock: ExtendedLock) => {
  const { mentoBalance } = useTokens();
  const { currentWeek, error: currentWeekError } = useLockingWeek();

  const maxExtensionWeeks = useMemo(() => {
    if (currentWeekError) return 0;
    return LockingHelper.calculateMaxExtensionWeeks(
      Number(currentWeek),
      lock?.time,
      lock?.slope,
    );
  }, [currentWeekError, currentWeek, lock?.time, lock?.slope]);

  const validationSchema = React.useMemo(() => {
    return object({
      [LOCKING_AMOUNT_FORM_KEY]: string()
        .test("isNumber", "Invalid number", (value) => !isNaN(Number(value)))
        // .test(
        //   "min",
        //   `The minimum value is ${MIN_LOCKABLE_AMOUNT}`,
        //   (value) => Number(value) >= MIN_LOCKABLE_AMOUNT,
        // )
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
        .min(1)
        .max(maxExtensionWeeks),
    });
  }, [maxExtensionWeeks, mentoBalance.decimals, mentoBalance.value]);

  return useForm<InferType<typeof validationSchema>>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      [LOCKING_AMOUNT_FORM_KEY]: "",
      [LOCKING_DURATION_FORM_KEY]: lock?.expiration ?? new Date(),
    },
  });
};
