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
  const endDate = addYears(startDate, 2); // Adds 2 years to the start date

  // Generates an array of all days except Wednesdays between the start and end dates
  const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(
    (day) => !isWednesday(day),
  );

  return days; // Formats each day to 'YYYY-MM-DD'
}
