import useTokens from "@/lib/contracts/useTokens";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "../constants";
import { formatUnits } from "viem";
import CurrencyInput from "../../currency-input/currency-input.component";

export const LockingInput = () => {
  const { mentoBalance } = useTokens();
  const {
    control,
    formState: { errors },
    trigger,
    setValue,
  } = useFormContext();

  const onMax = React.useCallback(() => {
    setValue(
      LOCKING_AMOUNT_FORM_KEY,
      formatUnits(mentoBalance.value, mentoBalance.decimals),
    );
    // Manually trigger validation on max as it's not a normal input change
    trigger([LOCKING_DURATION_FORM_KEY, LOCKING_AMOUNT_FORM_KEY]);
  }, [mentoBalance.decimals, mentoBalance.value, setValue, trigger]);

  const error = errors[LOCKING_AMOUNT_FORM_KEY];
  const errorMessage = error?.message?.toString();
  return (
    <Controller
      control={control}
      render={({ field: { onChange, ...rest } }) => (
        <CurrencyInput
          onMax={onMax}
          onChange={(value) => {
            onChange(value);
            trigger(LOCKING_DURATION_FORM_KEY);
          }}
          errorMessage={errorMessage}
          {...rest}
        />
      )}
      name={LOCKING_AMOUNT_FORM_KEY}
    />
  );
};
