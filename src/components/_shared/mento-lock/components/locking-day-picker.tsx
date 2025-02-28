"use client";

import {
  addWeeks,
  differenceInWeeks,
  format,
  isToday,
  nextWednesday,
} from "date-fns";
import { Controller, useFormContext } from "react-hook-form";

import LockingHelper from "@/lib/helpers/locking";
import { LOCKING_DURATION_FORM_KEY } from "@/lib/constants/locking";
import { DatePicker } from "../../date-picker/date-picker.component";

export const LockingDayPicker = () => {
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
    ...LockingHelper.getDaysExceptWednesday(),
  ];

  return (
    <Controller
      control={control}
      render={({ field: { onChange } }) => (
        <DatePicker
          defaultMonth={wednesdayAfterSelectedWeeks}
          fromMonth={new Date()}
          toMonth={LockingHelper.addYearsAndAdjustToNextWednesday(2)}
          fixedWeeks={true}
          disabled={listOfDaysAfterTodayExceptWednesdays}
          selected={wednesdayAfterSelectedWeeks}
          onDayClick={(d) => onChange(handleDateSelection(d))}
        >
          <DatePicker.Button>
            {wednesdayAfterSelectedWeeks &&
            !isToday(wednesdayAfterSelectedWeeks)
              ? format(wednesdayAfterSelectedWeeks, "PPP")
              : "Select a date"}
          </DatePicker.Button>
        </DatePicker>
      )}
      name={LOCKING_DURATION_FORM_KEY}
    />
  );
};
