"use client";
import React from "react";
import { formatUnits } from "viem";
import { useAccount } from "wagmi";
import { addWeeks, differenceInWeeks, nextWednesday } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

import useTokens from "@/lib/contracts/useTokens";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import {
  Button,
  Slider,
  CurrencyInput,
  DatePicker,
} from "@/components/_shared";
import { cn } from "@/styles/helpers";

import { LockingForm } from "./providers/locking-form";
import { usePerformLock } from "./hooks/usePerformLock";
import { LockingQuote } from "./components/locking-quote";
import {
  DEFAULT_CLIFF,
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
  MAX_LOCKING_DURATION_WEEKS,
} from "./constants";
import {
  addYearsToTodayAndAdjustToNextWednesday,
  getDaysExceptWednesday,
} from "./utils";

interface MentoLockProps extends BaseComponentProps {
  onLockConfirmation?: () => void;
}

export const MentoLock = ({
  className,
  onLockConfirmation,
}: MentoLockProps) => {
  return (
    <div className={className}>
      <LockingForm>
        <div className="grid grid-cols-2 items-start gap-1 md:gap-5">
          <LockingLabel>MENTO to lock:</LockingLabel>
          <LockingInput />
          <LockingLabel>Lock until:</LockingLabel>
          <LockingDayPicker />
          <LockingLabel>You receive veMENTO:</LockingLabel>
          <LockingFormLockingQuote />
        </div>
        <LockingSlider />
        <LockingButton onLockConfirmation={onLockConfirmation} />
      </LockingForm>
    </div>
  );
};

const LockingInput = () => {
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
const LockingFormLockingQuote = () => {
  const { watch } = useFormContext();

  const amount = Number(watch(LOCKING_AMOUNT_FORM_KEY));
  const slope = watch(LOCKING_DURATION_FORM_KEY);

  return <LockingQuote amount={amount} slope={slope} cliff={DEFAULT_CLIFF} />;
};
const LockingDayPicker = () => {
  const { control, watch } = useFormContext();

  const formWeeksSelectionWeeksToDate = addWeeks(
    new Date(),
    Number(watch(LOCKING_DURATION_FORM_KEY)),
  );
  const wednesdayAfterSelectedWeeks = nextWednesday(
    formWeeksSelectionWeeksToDate,
  );

  const handleDateSelection = (date: Date) => {
    return differenceInWeeks(date, new Date(), {
      roundingMethod: "floor",
    });
  };

  const listOfDaysAfterTodayExceptWednesdays = [
    {
      // Minimum lock duration is 1 week, and only on Wednesdays. Disable days before next Wednesday after a week
      before: nextWednesday(addWeeks(new Date(), 1)),
    },
    ...getDaysExceptWednesday(),
  ];

  return (
    <Controller
      control={control}
      render={({ field: { onChange } }) => (
        <DatePicker
          fromMonth={new Date()}
          toMonth={addYearsToTodayAndAdjustToNextWednesday(2)}
          fixedWeeks={true}
          disabled={listOfDaysAfterTodayExceptWednesdays}
          selected={wednesdayAfterSelectedWeeks}
          onDayClick={(d) => onChange(handleDateSelection(d))}
        />
      )}
      name={LOCKING_DURATION_FORM_KEY}
    />
  );
};
const LockingSlider = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, value } }) => (
        <Slider
          labels={{
            min: `1 week`,
            current: <CurrentValueLabel value={value} />,
            max: "2 Years",
          }}
          onValueChange={([val]) => {
            onChange(val);
          }}
          value={[value]}
          max={MAX_LOCKING_DURATION_WEEKS}
          step={1}
          min={1}
        />
      )}
      name={LOCKING_DURATION_FORM_KEY}
    />
  );
};
const CurrentValueLabel = ({ value }: { value: number }) => {
  return <>{`${value} weeks`}</>;
};
const LockingLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="whitespace-nowrap text-[22px]">{children}</div>;
};

const LockingButton = ({
  onLockConfirmation,
}: {
  onLockConfirmation?: () => void;
}) => {
  const {
    watch,
    reset,
    formState: { isValid, errors },
    handleSubmit,
  } = useFormContext();

  const { address } = useAccount();
  const amount = watch(LOCKING_AMOUNT_FORM_KEY);

  const { lockMento, approve, lock, needsApproval } = usePerformLock({
    onLockConfirmation,
    account: address!,
    delegate: address!,
    amount,
    slope: watch(LOCKING_DURATION_FORM_KEY),
  });

  const isBalanceInsufficient = errors.amountToLock?.type === "max";

  let content;

  if (amount === "") {
    content = <>Enter Amount</>;
  } else if (isBalanceInsufficient) {
    content = <>Insufficient Balance</>;
  } else if (approve.isAwaitingUserSignature || lock.isAwaitingUserSignature) {
    content = <>Continue in wallet</>;
  } else if (needsApproval) {
    content = <>Approve MENTO</>;
  } else {
    content = <>Lock MENTO</>;
  }

  return (
    <Button
      fullwidth
      className={cn(
        "!mt-x6",
        isBalanceInsufficient &&
          "pointer-events-none w-full cursor-not-allowed",
      )}
      disabled={!isValid && !isBalanceInsufficient && !approve.isConfirming}
      theme={isBalanceInsufficient ? "danger" : "primary"}
      onClick={(e) => {
        handleSubmit(() => {
          lockMento({
            onSuccess: () => {
              reset();
            },
          });
        })(e);
      }}
    >
      {content}
    </Button>
  );
};
