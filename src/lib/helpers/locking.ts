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

  public static getDaysExceptWednesday(endDate?: Date) {
    if (!endDate) {
      endDate = addYears(new Date(), 2);
    }
    const days = eachDayOfInterval({ start: new Date(), end: endDate }).filter(
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
}
