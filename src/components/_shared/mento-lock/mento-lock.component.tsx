import { LockingABI } from "@/lib/abi/Locking";
import useLockMento from "@/lib/contracts/locking/useLockMento";
import { useContracts } from "@/lib/contracts/useContracts";
import useTokens from "@/lib/contracts/useTokens";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import useModal from "@/lib/providers/modal.provider";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import {
  addWeeks,
  addYears,
  differenceInMonths,
  differenceInWeeks,
  differenceInYears,
  nextWednesday,
} from "date-fns";
import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { formatUnits } from "viem";
import { useAccount, useReadContract } from "wagmi";
import { date, number, object, setLocale } from "yup";
import { Button, DatePicker, Input, Loader, Slider } from "..";
import styles from "./mento-lock.module.scss";

interface MentoLockProps extends BaseComponentProps {
  className?: string;
}
const currentDate = new Date();

export const MentoLock = ({ className = "" }: MentoLockProps) => {
  const { address } = useAccount();
  const [debouncedToLock, setDebouncedToLock] = useState<number>(0);
  const [debouncedWeeks, setDebouncedWeeks] = useState<number>(0);
  const { showConfirm } = useModal();
  const contracts = useContracts();
  const { mentoBalance } = useTokens();
  const { lockMento, isConfirmed, reset: resetHook } = useLockMento();
  const balanceMENTO = parseInt(
    formatUnits(mentoBalance.value, mentoBalance.decimals),
  );

  const patchValidationSchema = useMemo(() => {
    return object({
      toLock: number().required().typeError("Invalid number").max(balanceMENTO),
      expiration: date()
        .required()
        .typeError("Invalid Date")
        .max(addYears(currentDate, 2)),
      expirationWeeks: number()
        .required()
        .typeError("Invalid number")
        .max(2 * 52),
    });
  }, [balanceMENTO]);

  setLocale({
    mixed: {
      default: "Invalid number",
    },
    number: {
      max: ({ max }) => `Amount exceeds current balance ${max}`,
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
    resolver: yupResolver(patchValidationSchema),
    mode: "all",
  });

  const watchExpiration = watch("expiration");
  const watchToLock = watch("toLock");
  const watchExpirationWeeks = watch("expirationWeeks");

  const addWeekDate = addWeeks(currentDate, -1);
  const weeks = useMemo(
    () => differenceInWeeks(watchExpiration, addWeekDate),
    [addWeekDate, watchExpiration],
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
    if (watchExpiration && watchToLock) debounceLock();
  }, [watchExpiration, watchToLock, debounceLock]);

  useEffect(() => {
    return () => {
      debounceLock.cancel();
    };
  }, [debounceLock]);

  const { data: getLock, isFetching: isLockFetching } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [BigInt(debouncedToLock * Math.pow(10, 18)), debouncedWeeks, 0],
  });

  const vementoParsed = useMemo(() => {
    if (!getLock) return;
    return Number(formatUnits(getLock?.[0] || 0n, 18)).toLocaleString();
  }, [getLock]);

  const weeksText = useMemo(() => {
    return weeks < 4 && `${weeks} ${weeks > 1 ? "weeks" : "week"}`;
  }, [weeks]);

  const months = useMemo(() => {
    const years = differenceInYears(watchExpiration, addWeekDate);
    const months = differenceInMonths(
      watchExpiration,
      addYears(addWeekDate, years),
    );

    return months > 0 && `${months} ${months > 1 ? "months" : "month"}`;
  }, [addWeekDate, watchExpiration]);

  const years = useMemo(() => {
    const years = differenceInYears(watchExpiration, addWeekDate);
    return years > 0 && `${years} ${years > 1 ? "years" : "year"}`;
  }, [addWeekDate, watchExpiration]);

  const dateSelected = (date: Date) => {
    setValue("expiration", date);
    setValue("expirationWeeks", differenceInWeeks(date, currentDate));
    trigger("expiration");
  };

  const performLock = useCallback(async () => {
    if (isValid && address) {
      const res = await showConfirm(
        `Do you want to lock ${getValues("toLock")} MENTO for ${[
          years,
          months,
          weeksText,
        ]
          .filter(Boolean)
          .join(" and ")}?`,
        {
          confirmText: "Lock",
          modalType: "info",
        },
      );

      if (!res) return;
      lockMento(
        address,
        address,
        debouncedToLock * Math.pow(10, 18),
        debouncedWeeks,
        10,
      );
    }
  }, [
    isValid,
    address,
    showConfirm,
    getValues,
    years,
    months,
    weeksText,
    lockMento,
    debouncedToLock,
    debouncedWeeks,
  ]);

  useEffect(() => {
    if (isConfirmed) {
      toast.success("MENTO has been successfully locked!");
      reset();
      resetHook();
    }
  }, [isConfirmed, reset, resetHook]);

  const weekSelected = (weeks: number | string) => {
    const newDate = nextWednesday(addWeeks(currentDate, +weeks));
    setValue("expiration", newDate);
    setValue("expirationWeeks", +weeks);
    trigger("expiration");
    trigger("expirationWeeks");
  };

  return (
    <div className={classNames(className, styles.container)}>
      <div className={styles.row}>
        <div className="flex-1 whitespace-nowrap mt-x1">MENTO to lock:</div>
        <div className="flex-1">
          <Input
            id="toLock"
            type="number"
            placeholder="Voting power"
            form={{ ...register("toLock") }}
            error={errors.toLock?.message}
            className={styles.toLockInput}
            classNameInput={styles.input}
            addon={
              <div className="opacity-50">
                <div className="flex justify-between gap-x3">
                  <button
                    className="whitespace-nowrap text-[14px]"
                    onClick={() => {
                      setValue("toLock", balanceMENTO);
                      trigger("toLock");
                    }}
                  >
                    Max
                  </button>
                  <div className="whitespace-nowrap text-[14px]">
                    {balanceMENTO}
                    MENTO
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className="flex-1 whitespace-nowrap mt-x3">Lock until:</div>
        <div className="flex-1">
          <DatePicker
            id="expiration"
            className="w-full"
            disallowedDays={["mon", "tue", "thu", "fri", "sat", "sun"]}
            minDate={nextWednesday(currentDate)}
            maxDate={nextWednesday(addWeeks(currentDate, 103))}
            calendarStartDate={currentDate}
            placeholder="Lock until"
            value={watch("expiration")}
            onChange={dateSelected}
            error={errors.expiration?.message}
          />
        </div>
      </div>

      <div className={classNames(styles.row, "mt-x6")}>
        <div className="flex-1 whitespace-nowrap mt-x1">
          You receive veMENTO:
        </div>
        <div className={styles.veMento}>
          {isLockFetching ? (
            <div className={styles.loader}>
              <Loader />
            </div>
          ) : (
            <span>{isValid ? vementoParsed : "¯\\_(ツ)_/¯"}</span>
          )}
        </div>
      </div>

      <Slider
        id="expirationWeeks"
        min={0}
        minLabel="1 week"
        max={103}
        maxLabel="2 years"
        step={1}
        value={watchExpirationWeeks}
        bubbleFormatter={() => {
          return [years, months, weeksText].filter(Boolean).join(" ");
        }}
        changeCallback={weekSelected}
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
