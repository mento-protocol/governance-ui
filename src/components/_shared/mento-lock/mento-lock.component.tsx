import { useCallback, useEffect, useMemo } from "react";
import { date, number, object, setLocale } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { Button, DatePicker, Input, Slider } from "@/components/_shared";
import {
  addMonths,
  addYears,
  differenceInMonths,
  differenceInYears,
  nextWednesday,
  setISODay,
} from "date-fns";
import useModal from "@/lib/providers/modal.provider";
import { formatUnits, parseUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import { useAccount } from "wagmi";
import useLockMento from "@/lib/contracts/locking/useLockMento";
import useAllowance from "@/lib/contracts/mento/useAllowance";
import { useContracts } from "@/lib/contracts/useContracts";
import useApprove from "@/lib/contracts/mento/useApprove";

interface MentoLockProps extends BaseComponentProps {}

export const MentoLock = ({ className, style }: MentoLockProps) => {
  const { mentoBalance } = useTokens();
  const { address } = useAccount();
  const { showConfirm } = useModal();
  const {
    Locking: { address: lockingAddress },
  } = useContracts();

  const { data: allowance } = useAllowance({
    spender: lockingAddress,
    owner: address,
  });

  const { approveMento, reset: resetApproveHook } = useApprove();
  const { lockMento, isConfirmed, reset: resetLockHook } = useLockMento();

  const validationSchema = useMemo(() => {
    return object({
      toLock: number()
        .required()
        .typeError("Invalid number")
        .max(parseInt(formatUnits(mentoBalance.value, mentoBalance.decimals))),
      expiration: date()
        .required()
        .typeError("Invalid Date")
        .min(addYears(new Date(), 1))
        .max(addYears(new Date(), 4)),
      expirationMonths: number()
        .required()
        .typeError("Invalid number")
        .max(4 * 52),
    });
  }, [mentoBalance]);

  setLocale({
    mixed: {
      default: "Invalid number",
    },
    number: {
      max: ({ max }) => `Must not exceed ${max}`,
    },
    date: {
      max: ({ max }) => `Cannot lock for more than 4 years`,
      min: ({ min }) => `Cannot lock for less than 1 year`,
    },
  });

  const {
    register,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const getMonths = useCallback(() => {
    const years = differenceInYears(
      getValues("expiration"),
      setISODay(new Date(), 3),
    );
    const months = differenceInMonths(
      getValues("expiration"),
      setISODay(addYears(new Date(), years), 3),
    );
    return months > 0 && `${months} ${months > 1 ? "months" : "month"}`;
  }, [getValues]);

  const getYears = useCallback(() => {
    const years = differenceInYears(
      getValues("expiration"),
      setISODay(new Date(), 3),
    );
    return years > 0 && `${years} ${years > 1 ? "years" : "year"}`;
  }, [getValues]);

  const dateSelected = (date: Date) => {
    setValue("expiration", date);
    setValue(
      "expirationMonths",
      differenceInMonths(date, setISODay(new Date(), 3)),
    );
    trigger("expiration");
  };

  const performLock = useCallback(() => {
    if (isValid && address && allowance) {
      showConfirm(
        `Do you want to lock ${getValues("toLock")} MENTO for ${[
          getYears(),
          getMonths(),
        ]
          .filter(Boolean)
          .join(" and ")}?`,
        {
          confirmText: "Lock",
          modalType: "info",
        },
      ).then((confirmed) => {
        if (confirmed) {
          const toLock = parseUnits(
            `${getValues("toLock")}`,
            mentoBalance.decimals,
          );
          if (allowance < toLock) {
            // On success trigger lock
            approveMento(lockingAddress, toLock, () => {
              lockMento(address, address, toLock, 10, 10, () => {
                resetApproveHook();
                resetLockHook();
              });
            });
          } else {
            lockMento(address, address, toLock, 10, 10, resetLockHook);
          }
        }
      });
    }
  }, [
    address,
    allowance,
    approveMento,
    getMonths,
    getValues,
    getYears,
    isValid,
    lockMento,
    lockingAddress,
    mentoBalance.decimals,
    resetApproveHook,
    resetLockHook,
    showConfirm,
  ]);

  useEffect(() => {
    if (isConfirmed) {
      reset();
      resetLockHook();
    }
  }, [isConfirmed, reset, resetLockHook]);

  const monthSelected = (months: number | string) => {
    const newDate = nextWednesday(addMonths(new Date(), +months));
    setValue("expiration", newDate);
    setValue("expirationMonths", +months);
    trigger("expiration");
  };

  return (
    <div className={className} style={style}>
      <div className="flex flex-col justify-between gap-1 md:place-items-baseline md:gap-5 lg:flex-row">
        <div className="flex-1 whitespace-nowrap text-lg">MENTO to lock:</div>
        <div className="flex-1">
          <Input
            id="toLock"
            type="number"
            placeholder="Voting power"
            form={{ ...register("toLock") }}
            error={errors.toLock?.message}
            addon={
              <div className="text-xs opacity-50">
                <div className="flex justify-between gap-x3">
                  <div className="whitespace-nowrap">Max</div>
                  <div className="whitespace-nowrap">
                    {`${formatUnits(mentoBalance.value, mentoBalance.decimals)} ${mentoBalance.symbol}`}
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className="flex flex-col justify-between gap-1 md:place-items-baseline md:gap-5 lg:flex-row">
        <div className="flex-1 whitespace-nowrap text-lg">Lock expires:</div>
        <div className="flex-1">
          <DatePicker
            id="expiration"
            className="w-full"
            disallowedDays={["mon", "tue", "thu", "fri", "sat", "sun"]}
            minDate={nextWednesday(addMonths(new Date(), 1))}
            maxDate={nextWednesday(addYears(new Date(), 4))}
            calendarStartDate={new Date()}
            placeholder="Lock expires"
            value={watch("expiration")}
            onChange={(date) => dateSelected(date)}
            addon={
              <div className="text-xs opacity-50">Between 1 and 4 years</div>
            }
            error={errors.expiration?.message}
          />
        </div>
      </div>

      <div className="mt-x6 flex flex-col justify-between gap-1 md:place-items-baseline md:gap-5 lg:flex-row">
        <div className="flex-1 whitespace-nowrap text-lg">
          You receive veMENTO:
        </div>
        <div className="flex-1">
          <strong>
            {isValid
              ? Math.round(
                  watch("toLock") * 100 * (watch("expirationMonths") / 12),
                )
              : "¯\\_(ツ)_/¯"}
          </strong>
        </div>
      </div>

      <Slider
        id={"expirationMonths"}
        min={1}
        minLabel={`1 month`}
        max={48}
        maxLabel={`4 years`}
        step={1}
        value={watch("expirationMonths")}
        bubbleFormatter={(value) => {
          return [getYears(), getMonths()].filter(Boolean).join(" ");
        }}
        changeCallback={(value) => monthSelected(value)}
        form={{
          ...register("expirationMonths", {
            value: 1,
          }),
        }}
      />
      <Button
        block
        className="!mt-x6"
        onClick={handleSubmit(performLock)}
        disabled={!isValid}
      >
        Lock MENTO
      </Button>
    </div>
  );
};
