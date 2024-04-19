import { addWeeks, differenceInWeeks, nextWednesday } from "date-fns";
import { Controller, useFormContext } from "react-hook-form";
import { LOCKING_DURATION_FORM_KEY } from "../constants";
import {
  addYearsToTodayAndAdjustToNextWednesday,
  getDaysExceptWednesday,
} from "../utils";
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
