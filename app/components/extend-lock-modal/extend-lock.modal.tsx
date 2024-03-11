import styles from "@components/_shared/date-picker/date-picker.module.scss";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { useMemo, useState } from "react";
import {
  dayToNumberMap,
  DisallowedDay,
} from "@interfaces/date-picker.interface";
import {
  differenceInCalendarWeeks,
  differenceInWeeks,
  isBefore,
  setDay,
} from "date-fns";
import addDays from "date-fns/addDays";
import { LockingABI } from "@/app/abis/Locking";
import { toast } from "sonner";
import { Lock } from "@/app/graphql";
import { useAccount, useWriteContract } from "wagmi";
import { useContracts } from "@/app/hooks/useContracts";
import { Button, Card, Loader } from "@components/_shared";
import useModal from "@/app/providers/modal.provider";

interface ExtendLockModalProps {
  minDate: Date;
  maxDate: Date;
  lock: Lock;
}

const disallowedDays: DisallowedDay[] = [
  "mon",
  "tue",
  "thu",
  "fri",
  "sat",
  "sun",
];

export const ExtendLockModal = ({
  minDate,
  maxDate,
  lock,
}: ExtendLockModalProps) => {
  const [pickerDate, setPickerDate] = useState<Date | undefined>(minDate);
  const [isPending, setIsPending] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(minDate);
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const contracts = useContracts();
  const { removeModal } = useModal();

  const handleDayClick: SelectSingleEventHandler = (date) => {
    setPickerDate(date);
  };

  const onMonthChange = (date: Date) => {
    setCalendarMonth(date);
  };

  const disabledDays = useMemo(() => {
    if (!minDate || !maxDate) return [];

    const disallowedDaysMapped = (disallowedDays || []).map(
      (day: DisallowedDay) => dayToNumberMap[day],
    );

    let current = minDate;
    const disabledDays = [];

    while (isBefore(current, maxDate)) {
      if (disallowedDaysMapped?.includes(current.getDay())) {
        disabledDays.push(current);
      }
      current = addDays(current, 1);
    }

    return disabledDays;
  }, [minDate, maxDate]);

  const save = () => {
    setIsPending(true);
    const elapsedWeeks = differenceInCalendarWeeks(
      setDay(new Date(), 3),
      setDay(new Date(lock.lockCreate[0].timestamp * 1000), 3),
    );
    const newCliff =
      lock.cliff - elapsedWeeks < 0 ? 0 : lock.cliff - elapsedWeeks;

    const newSlope =
      differenceInCalendarWeeks(pickerDate!, setDay(new Date(), 3)) - newCliff;

    writeContract(
      {
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "relock",
        args: [lock.lockId, address!, lock.amount, newSlope, newCliff],
      },
      {
        onSuccess: () => {
          toast.success("Lock extended");
          setIsPending(false);
          removeModal();
        },
        onError: (error) => {
          console.error(error.message);
          toast.error(error.message);
          setIsPending(false);
          removeModal();
        },
      },
    );
  };

  const cancel = () => {
    console.log("cancel");
    removeModal();
  };

  return (
    <div className="relative pb-x8 md:pb-0">
      <div className="flex flex-col justify-center items-center">
        <DayPicker
          mode="single"
          required
          fromDate={minDate}
          selected={pickerDate}
          toDate={maxDate}
          month={calendarMonth}
          numberOfMonths={1}
          showOutsideDays
          fixedWeeks
          disabled={disabledDays}
          modifiersClassNames={{
            selected: styles.selected,
          }}
          onSelect={handleDayClick}
          onMonthChange={onMonthChange}
        />
      </div>
      <div className="flex justify-end gap-x2 mt-x4">
        <Button theme="tertiary" onClick={cancel} block disabled={isPending}>
          Cancel
        </Button>
        <Button
          theme="primary"
          onClick={save}
          block
          disabled={!pickerDate || isPending}
        >
          Extend
        </Button>
      </div>
      {isPending && (
        <div className="absolute w-full h-full left-0 top-0 z-50 backdrop-blur-sm flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};
