"use client";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { isBefore, addDays } from "date-fns";
import classNames from "classnames";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import useOutsideAlerter from "@/lib/hooks/useOutsideAlerter";
import "react-day-picker/dist/style.css";

type DisallowedDay =
  | "sun"
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6;

interface DatePickerProps extends BaseComponentProps {
  compact?: boolean;
  addon?: ReactNode;
  minDate?: Date;
  calendarStartDate?: Date;
  maxDate?: Date;
  value?: Date;
  disallowedDays?: DisallowedDay[];
  id?: string;
  label?: string;
  error?: string;
  placeholder?: string;
  onChange?: (date: Date) => void;
}

const dayToNumberMap: Record<DisallowedDay, number> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
};

export const DatePicker = ({
  id,
  label,
  error,
  placeholder,
  minDate,
  maxDate,
  compact,
  className,
  disallowedDays,
  onChange,
  value,
  addon,
  calendarStartDate,
}: DatePickerProps) => {
  const datePicker = useRef(null);
  useOutsideAlerter(datePicker, () => {
    setDatePickerOpened(false);
  });

  const [selectedDate, setSelectedDate] = useState(value);
  const [calendarMonth, setCalendarMonth] = useState(
    value || calendarStartDate || minDate,
  );
  const [datePickerOpened, setDatePickerOpened] = useState(false);

  useEffect(() => {
    setSelectedDate(value);
  }, [value]);

  useEffect(() => {
    setCalendarMonth(value || calendarStartDate || minDate);
  }, [value, calendarStartDate, minDate]);

  const disabledDays = useMemo(() => {
    if (!minDate || !maxDate) return [];

    const disallowedDaysMapped = (disallowedDays || []).map(
      (day) => dayToNumberMap[day],
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
  }, [minDate, maxDate, disallowedDays]);

  const handleDayClick: SelectSingleEventHandler = (date) => {
    setSelectedDate(date);
    setDatePickerOpened(false);

    onChange && onChange(date!);
  };

  const onMonthChange = (date: Date) => {
    setCalendarMonth(date);
  };

  return (
    <div
      className={`relative mt-4 ${compact && "group/compact-input"} ${className}`}
    >
      {!!label && <label htmlFor={id}>{label}</label>}
      <div
        // TODO: box-shadow: 0 0 0 2px $c-primary
        className={`group/compact-input:py-3 group/compact-input:px-4 group/compact-input:[& input]:text-sm cursor-pointer ${
          datePickerOpened && "border-primary-blue border border-solid"
        } ${
          // TODO: box-shadow: 0 0 0 2px $c-error
          !!error && "border border-solid border-light-red"
        }`}
        onClick={() => setDatePickerOpened(true)}
      >
        <div id={id}>
          {!selectedDate && (
            // TODO: class "placeholder" not found only pseudo selector found
            // <div className={styles.placeholder}>{placeholder}</div>
            <div>{placeholder}</div>
          )}
          {!!selectedDate && (
            // TODO: class "selectedDate"
            // <div className={styles.selectedDate}>
            <div>{selectedDate.toLocaleDateString()}</div>
          )}
        </div>
        {addon}
      </div>
      {!!error && (
        <div className="p-1 text-sm font-semibold text-error-dark">{error}</div>
      )}

      <div
        className={classNames(
          // styles.backdrop
          "pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-[-1] opacity-0 backdrop-blur-[2px]",
          datePickerOpened &&
            // TODO: Confirm this works
            // Figure out default-backdrop transition field
            "pointer-events-[all] group/picker-open z-[1000] opacity-100",
        )}
      >
        {/* <div ref={datePicker} className={classNames(styles.pickerDropdown)}> */}
        {/* TODO: padding is 16 not 15 */}
        {/* TODO: Box shadow, transform & transition */}
        <div
          ref={datePicker}
          className="min-[350px] : fixed bottom-0 left-0 right-0 h-[50vh] flex-col items-center justify-center rounded-tl-lg rounded-tr-lg p-4"
        >
          {/* TODO: Inner not found in styles. Only found in create proposal & button */}
          {/* <div className={styles.inner}> */}
          <div>
            <DayPicker
              mode="single"
              fromDate={minDate}
              selected={selectedDate}
              toDate={maxDate}
              month={calendarMonth}
              numberOfMonths={1}
              showOutsideDays
              fixedWeeks
              disabled={disabledDays}
              modifiersClassNames={{
                // selected: styles.selected,
                selected: "bg-primary text-white",
              }}
              onSelect={handleDayClick}
              onMonthChange={onMonthChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
