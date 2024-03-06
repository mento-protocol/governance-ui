import styles from "@components/_shared/date-picker/date-picker.module.scss";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import { useMemo, useState } from "react";
import {
  dayToNumberMap,
  DisallowedDay,
} from "@interfaces/date-picker.interface";
import { differenceInWeeks, isBefore, setDay } from "date-fns";
import addDays from "date-fns/addDays";
import { LockingABI } from "@/app/abis/Locking";
import { toast } from "sonner";
import { Lock } from "@/app/graphql";
import { useAccount, useWriteContract } from "wagmi";
import { useContracts } from "@/app/hooks/useContracts";
import { Button, Card } from "@components/_shared";
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
    const newSlope = differenceInWeeks(pickerDate!, setDay(new Date(), 3));

    console.log("relock", [lock.lockId, address!, lock.amount, newSlope, 0]);

    console.log("initial", [
      lock.lockId,
      address!,
      lock.amount,
      lock.slope,
      lock.cliff,
    ]);

    writeContract(
      {
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "relock",
        args: [lock.lockId, address!, lock.amount, newSlope, 0],
      },
      {
        onSuccess: () => {
          toast.success("Lock extended");
          removeModal();
        },
        onError: (error) => {
          console.error(error.message);
          toast.error(error.message);
          removeModal();
        },
      },
    );
    console.log("save");
  };

  const cancel = () => {
    console.log("cancel");
    removeModal();
  };

  return (
    <div>
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
      <div className="flex justify-end gap-x2 mt-x4">
        <Button theme="tertiary" onClick={cancel} block>
          Cancel
        </Button>
        <Button theme="primary" onClick={save} block>
          Extend
        </Button>
      </div>
    </div>
  );
};
