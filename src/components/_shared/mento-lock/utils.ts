import {
  isWednesday,
  addYears,
  nextWednesday,
  eachDayOfInterval,
} from "date-fns";

export function addYearsToTodayAndAdjustToNextWednesday(years: number): Date {
  const futureDate = addYears(new Date(), years);
  return isWednesday(futureDate) ? futureDate : nextWednesday(futureDate);
}

export function getDaysExceptWednesday(startDate = new Date()) {
  const endDate = addYears(startDate, 2);

  const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(
    (day) => !isWednesday(day),
  );

  return days;
}
