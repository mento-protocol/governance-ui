import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button, DatePicker, Input, Slider } from "@components/_shared";
import {
  addWeeks,
  addYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  isWednesday,
  nextWednesday,
} from "date-fns";
import { date, InferType, number, object, setLocale } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserStore } from "@/app/store";
import { useEffect, useMemo, useRef, useState } from "react";
import { ILock } from "@interfaces/lock.interface";
import useModal from "@/app/providers/modal.provider";
import { useReadContract } from "wagmi";
import { useContracts } from "@/app/hooks/useContracts";
import { LockingABI } from "@/app/abis/Locking";
import "react-day-picker/dist/style.css";
import { debounce } from "lodash";
import { formatUnits } from "viem";
import { useChainState } from "@/app/providers/chainState.provider";

interface MentoLockProps extends BaseComponentProps {}

let validationSchema = object({
  toLock: number().required().typeError("Invalid number").max(0),
  expiration: date()
    .required()
    .typeError("Invalid Date")
    .min(new Date())
    .max(addYears(new Date(), 2)),
  expirationWeeks: number()
    .required()
    .typeError("Invalid number")
    .max(2 * 52),
});

type FormData = InferType<typeof validationSchema>;

export const MentoLock = ({ className, style }: MentoLockProps) => {
  const { walletAddress, lock } = useUserStore();
  const [debouncedToLock, setDebouncedToLock] = useState<number>(0);
  const [debouncedWeeks, setDebouncedWeeks] = useState<number>(0);
  const { showConfirm } = useModal();
  const contracts = useContracts();
  const tokens = useChainState((s) => s.tokens);
  const balanceMENTO = Number(
    formatUnits(tokens.mento.balance, tokens.mento.decimals),
  );

  const patchValidationSchema = (value: number) => {
    validationSchema = object({
      toLock: number().required().typeError("Invalid number").max(value),
      expiration: date()
        .required()
        .typeError("Invalid Date")
        .min(new Date())
        .max(addYears(new Date(), 2)),
      expirationWeeks: number()
        .required()
        .typeError("Invalid number")
        .max(2 * 52),
    });
  };

  useEffect(() => {
    patchValidationSchema(balanceMENTO);
  }, [balanceMENTO]);

  setLocale({
    mixed: {
      default: "Invalid number",
    },
    number: {
      max: ({ max }) => `Must not exceed ${max}`,
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
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const currentDate = new Date();
  const addWeekDate = addWeeks(currentDate, -1);
  const weeks = useMemo(
    () => differenceInWeeks(getValues("expiration"), addWeekDate),
    [addWeekDate, watch("expiration")],
  );

  const debounceLock = useRef(
    debounce(async () => {
      const toLockVal = getValues("toLock");
      const addWeek = addWeeks(currentDate, -1);
      const weeksCount = differenceInWeeks(getValues("expiration"), addWeek);

      if (toLockVal && weeksCount) {
        setDebouncedToLock(toLockVal);
        setDebouncedWeeks(weeksCount);
      }
    }, 500),
  ).current;

  useEffect(() => {
    debounceLock();
  }, [watch("expiration"), watch("toLock"), watch("expirationWeeks")]);

  useEffect(() => {
    return () => {
      debounceLock.cancel();
    };
  }, [debounceLock]);

  const { data: getLock } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [BigInt(debouncedToLock * Math.pow(10, 18)), debouncedWeeks, 0],
  });

  const vementoParsed = useMemo(() => {
    return Number(formatUnits(getLock?.[0] || 0n, 18)).toLocaleString();
  }, [getLock]);

  const getWeeks = () => {
    const weeksCount = isWednesday(currentDate) ? weeks - 1 : weeks;
    return (
      weeksCount < 4 && `${weeksCount} ${weeksCount > 1 ? "weeks" : "week"}`
    );
  };

  const getMonths = () => {
    const years = differenceInYears(getValues("expiration"), addWeekDate);
    const months = differenceInMonths(
      getValues("expiration"),
      addYears(addWeekDate, years),
    );

    return months > 0 && `${months} ${months > 1 ? "months" : "month"}`;
  };

  const getYears = () => {
    const years = differenceInYears(getValues("expiration"), addWeekDate);
    return years > 0 && `${years} ${years > 1 ? "years" : "year"}`;
  };

  const dateSelected = (date: Date) => {
    setValue("expiration", date);
    setValue("expirationWeeks", differenceInWeeks(date, new Date()));
    trigger("expiration");
  };

  const performLock = () => {
    if (isValid) {
      showConfirm(
        `Do you want to lock ${getValues("toLock")} MENTO for ${[
          getYears(),
          getMonths(),
          getWeeks(),
        ]
          .filter(Boolean)
          .join(" and ")}?`,
        {
          confirmText: "Lock",
          modalType: "info",
        },
      ).then((confirmed) => {
        if (confirmed) {
          // lock({
          //   owner: walletAddress,
          //   amountMNTO: getValues("toLock"),
          //   amountsVeMNTO: getLock?.[0],
          //   expireDate: getValues("expiration"),
          // } as ILock).then(() => {
          //   reset();
          // });
        }
      });
    }
  };

  const weekSelected = (weeks: number | string) => {
    const newDate = nextWednesday(addWeeks(new Date(), +weeks));
    setValue("expiration", newDate);
    setValue("expirationWeeks", +weeks);
    trigger("expiration");
    trigger("expirationWeeks");
  };

  return (
    <div className={className} style={style}>
      <div className="flex flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">MENTO to lock:</div>
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
                  <button
                    className="whitespace-nowrap"
                    onClick={() => {
                      setValue("toLock", balanceMENTO);
                      trigger("toLock");
                    }}
                  >
                    Max available
                  </button>
                  <div className="whitespace-nowrap">
                    {balanceMENTO}
                    MENTO
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className="flex flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">Lock until:</div>
        <div className="flex-1">
          <DatePicker
            id="expiration"
            className="w-full"
            disallowedDays={["mon", "tue", "thu", "fri", "sat", "sun"]}
            minDate={nextWednesday(new Date())}
            maxDate={nextWednesday(addWeeks(new Date(), 103))}
            calendarStartDate={new Date()}
            placeholder="Lock until"
            value={watch("expiration")}
            onChange={(date) => dateSelected(date)}
            error={errors.expiration?.message}
          />
        </div>
      </div>

      <div className="flex mt-x6 flex-row justify-between md:place-items-baseline gap-1 md:gap-5">
        <div className="text-lg flex-1 whitespace-nowrap">
          You receive veMENTO:
        </div>
        <div className="flex-1">
          <strong>{isValid ? vementoParsed : "¯\\_(ツ)_/¯"}</strong>
        </div>
      </div>

      <Slider
        id="expirationWeeks"
        min={0}
        minLabel="1 week"
        max={103}
        maxLabel="2 years"
        step={1}
        value={watch("expirationWeeks")}
        bubbleFormatter={() => {
          return [getYears(), getMonths(), getWeeks()]
            .filter(Boolean)
            .join(" ");
        }}
        changeCallback={(value) => weekSelected(value)}
        form={{
          ...register("expirationWeeks", {
            value: 0,
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
