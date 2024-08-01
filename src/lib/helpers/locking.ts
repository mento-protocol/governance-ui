import {
  addWeeks,
  addYears,
  differenceInWeeks,
  eachDayOfInterval,
  isWednesday,
  nextWednesday,
} from "date-fns";

export default abstract class LockingHelper {
  public static addYearsAndAdjustToNextWednesday(
    years: number,
    startDate: Date = new Date(),
  ): Date {
    const futureDate = addYears(startDate, years);
    return isWednesday(futureDate) ? futureDate : nextWednesday(futureDate);
  }

  public static getDaysExceptWednesday(startDate = new Date(), endDate: Date) {
    const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(
      (day) => !isWednesday(day),
    );
    return days;
  }

  public static getDateAfterXWeeks = (weeks: number | string = 1) => {
    const _weeks = Number(weeks);
    return addWeeks(new Date(), _weeks);
  };

  public static getNextWednesdayAfterWeeks = (weeks: number) => {
    return nextWednesday(this.getDateAfterXWeeks(weeks));
  };

  public static getDateInFutureAsWeeks = (date: Date) => {
    if (!date) return 0;
    if (date < new Date()) return 0;
    return differenceInWeeks(date, new Date(), {
      roundingMethod: "floor",
    });
  };

  public static getLockExpirationDate = (
    startDateTimeStamp: number,
    slope: number,
    cliff: number,
  ) => {
    const startDate = new Date(startDateTimeStamp * 1000);
    return nextWednesday(addWeeks(startDate, slope + cliff));
  };
}
