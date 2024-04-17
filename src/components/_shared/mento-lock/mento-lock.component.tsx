"use client";
import React from "react";
import { number } from "yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { Button, Slider } from "@/components/_shared";

import { Address, formatUnits, parseEther } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount, useSimulateContract } from "wagmi";
import useLockMentoHook from "@/lib/contracts/locking/useLockMento";
import { useContracts } from "@/lib/contracts/useContracts";
import useApprove from "@/lib/contracts/mento/useApprove";
import NumberInput from "../number-input/number-input.component";

import { yupResolver } from "@hookform/resolvers/yup";
import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import NumbersService from "@/lib/helpers/numbers.service";

import {
  addWeeks,
  addYears,
  differenceInWeeks,
  eachDayOfInterval,
  isWednesday,
  nextWednesday,
} from "date-fns";
import { LockingABI } from "@/lib/abi/Locking";
import { DatePicker } from "../date-picker/date-picker.component";

interface MentoLockProps extends BaseComponentProps {}
const DEFAULT_CLIFF = 10;
const MAX_LOCKING_DURATION_WEEKS = 104;
const MIN_LOCKABLE_AMOUNT = 1;

function getDaysExceptWednesday(startDate = new Date()) {
  const endDate = addYears(startDate, 2); // Adds 2 years to the start date

  // Generates an array of all days except Wednesdays between the start and end dates
  const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(
    (day) => !isWednesday(day),
  );

  return days; // Formats each day to 'YYYY-MM-DD'
}

export const MentoLock = ({ className }: MentoLockProps) => {
  const {
    control,
    setMaxAmount,
    watch,
    formState: { isDirty, isValid },
    handleSubmit,
  } = useLockingForm();
  const { address } = useAccount();
  const amountToLock = Number(watch("amountToLock"));
  const lockingDuration = watch("lockingDurationInWeeks");

  const { lockMento, approve, lock, needsApproval } = usePerformLock({
    account: address!,
    delegate: address!,
    amount: watch("amountToLock"),
    slope: watch("lockingDurationInWeeks"),
  });

  const quote = useLockingQuote({
    amountToLock,
    lockingDuration,
  });

  const formWeeksSelectionWeeksToDate = addWeeks(
    new Date(),
    Number(watch("lockingDurationInWeeks")),
  );

  const wednesdayAfterSelectedWeeks = nextWednesday(
    formWeeksSelectionWeeksToDate,
  );

  // const isSelectedDateValid = isAfter(
  //   addWeeks(new Date(), Number(watch("lockingDurationInWeeks"))),
  //   new Date(),
  // );

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
    <div className={className}>
      <form
        onSubmit={handleSubmit(() => {
          lockMento();
        })}
      >
        <div className="grid grid-cols-2 items-start gap-1 md:gap-5">
          <div className="whitespace-nowrap text-[22px] ">MENTO to lock:</div>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <NumberInput
                onMax={setMaxAmount}
                inputMode="numeric"
                pattern="[0-9]*"
                type="text"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => onChange(e.target.value)}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="amountToLock"
          />
          <div className="whitespace-nowrap text-lg">Lock until:</div>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
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
            name="lockingDurationInWeeks"
          />
          <div className="whitespace-nowrap text-lg">You receive veMENTO:</div>
          <span>
            {quote.isLoading ? (
              <div className="animate-pulse rounded-[4px] bg-gray-300 ">
                <span className="opacity-0">{amountToLock}</span>
              </div>
            ) : (
              <div className="font-medium">
                {NumbersService.parseNumericValue(quote?.data)}
              </div>
            )}
          </span>
        </div>
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
          name="lockingDurationInWeeks"
        />
        <Button
          type="submit"
          fullwidth
          className="!mt-x6"
          disabled={!isDirty || !isValid}
        >
          <>
            {approve.isAwaitingUserSignature || lock.isAwaitingUserSignature ? (
              <>Continue in wallet</>
            ) : (
              <>{needsApproval ? "Approve and Lock MENTO" : "Lock MENTO"}</>
            )}
          </>
        </Button>
      </form>
    </div>
  );
};

const CurrentValueLabel = ({ value }: { value: number }) => {
  return <>{`${value} weeks`}</>;
};

const useDebounce = <T,>(value: T, delay = 250): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

const useLockingQuote = ({
  amountToLock,
  lockingDuration,
}: {
  amountToLock: number;
  lockingDuration: number;
}) => {
  const debouncedAmount = useDebounce(amountToLock, 500);
  const debouncedLockingDuration = useDebounce(lockingDuration, 500);
  const { data, ...rest } = useLockCalculation({
    lock: {
      amount: debouncedAmount,
      slope: debouncedLockingDuration,
      cliff: DEFAULT_CLIFF,
    },
  });

  return { data: !data?.length ? 0 : Number(data[0]), ...rest };
};

const usePerformLock = ({
  account,
  amount,
  delegate,
  slope,
}: {
  account: Address;
  amount: string;
  delegate: Address;
  slope: number;
}) => {
  const contracts = useContracts();
  const approve = useApprove();
  const lock = useLockMentoHook();

  const { approveMento } = approve;
  const { lockMento } = lock;
  const result = useSimulateContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "lock",
    args: [account, delegate, parseEther(amount), slope, DEFAULT_CLIFF],
    query: {
      enabled: slope > 0 && parseEther(amount) > 0,
    },
  });

  const approveThenLock = React.useCallback(
    (
      mentoTokenOwnerAddress: Address,
      delegate: Address,
      amountToLock: bigint,
      lockDurationInWeeks: number,
    ) => {
      approveMento(contracts.Locking.address, amountToLock, () => {
        result.refetch();
        lockMento({
          account: mentoTokenOwnerAddress,
          amount: amountToLock,
          delegate,
          slope: lockDurationInWeeks,
          cliff: DEFAULT_CLIFF,
        });
      });
    },
    [approveMento, contracts.Locking.address, lockMento, result],
  );

  const needsApproval = React.useMemo(() => {
    return Boolean(
      result.failureCount > 0 &&
        (result?.failureReason?.cause as { reason: string })?.reason ===
          "ERC20: insufficient allowance",
    );
  }, [result.failureCount, result?.failureReason?.cause]);

  const performLock = React.useCallback(() => {
    if (!needsApproval) {
      lockMento({
        account,
        amount: parseEther(amount),
        delegate,
        slope,
        cliff: DEFAULT_CLIFF,
      });
    } else {
      approveThenLock(account, delegate, parseEther(amount), slope);
    }
  }, [
    needsApproval,
    lockMento,
    account,
    amount,
    delegate,
    slope,
    approveThenLock,
  ]);
  return {
    lockMento: performLock,
    canLock: false,
    needsApproval,
    approve,
    lock,
  };
};

const useLockingForm = () => {
  const { mentoBalance } = useTokens();
  const validationSchema = React.useMemo(() => {
    return yup.object({
      amountToLock: yup
        .string()
        .required("amount is required")
        .test("isNumber", "Invalid number", (value) => !isNaN(Number(value)))
        .test(
          "min",
          `The minimum value is ${MIN_LOCKABLE_AMOUNT}`,
          (value) => Number(value) >= MIN_LOCKABLE_AMOUNT,
        )
        .test(
          "max",
          `The maximum value is ${mentoBalance.value}`,
          (value) => Number(value) <= mentoBalance.value,
        ),
      lockingDurationInWeeks: number()
        .required()
        .typeError("Invalid Date")
        .min(1)
        .max(104),
    });
  }, [mentoBalance]);

  type FormData = yup.InferType<typeof validationSchema>;
  const form = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
    defaultValues: {
      amountToLock: "",
      lockingDurationInWeeks: 1,
    },
  });
  const setMaxAmount = React.useCallback(() => {
    form.setValue(
      "amountToLock",
      formatUnits(mentoBalance.value, mentoBalance.decimals),
    );
  }, [form, mentoBalance.decimals, mentoBalance.value]);
  return { ...form, setMaxAmount };
};

function addYearsToTodayAndAdjustToNextWednesday(years: number): Date {
  const futureDate = addYears(new Date(), years);
  return isWednesday(futureDate) ? futureDate : nextWednesday(futureDate);
}
