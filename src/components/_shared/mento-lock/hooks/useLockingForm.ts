import useTokens from "@/lib/contracts/useTokens";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { formatUnits } from "viem";
import { number, object, string, InferType } from "yup";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "../constants";

const MIN_LOCKABLE_AMOUNT = 1;

export const useLockingForm = () => {
  const { mentoBalance } = useTokens();

  const validationSchema = React.useMemo(() => {
    return object({
      [LOCKING_AMOUNT_FORM_KEY]: string()
        .required("Amount is required")
        .test("isNumber", "Invalid number", (value) => !isNaN(Number(value)))
        .test(
          "min",
          `The minimum value is ${MIN_LOCKABLE_AMOUNT}`,
          (value) => Number(value) >= MIN_LOCKABLE_AMOUNT,
        )
        .test(
          "max",
          `Amount exceeds balance`,
          (value) =>
            Number(value) <=
            Number(formatUnits(mentoBalance.value, mentoBalance.decimals)),
        ),
      [LOCKING_DURATION_FORM_KEY]: number()
        .required()
        .typeError("Invalid Date")
        .min(1)
        .max(104),
    });
  }, [mentoBalance]);

  type FormData = InferType<typeof validationSchema>;

  return useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      amountToLock: "",
      lockingDurationInWeeks: 1,
    },
  });
};
