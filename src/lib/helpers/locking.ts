import {
  addWeeks,
  addYears,
  differenceInWeeks,
  eachDayOfInterval,
  isWednesday,
  nextWednesday,
  startOfWeek,
  subWeeks,
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
      endDate = addYears(new Date(), 10);
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

  public static getListOfWednesdays = () => {
    return [
      {
        // Minimum lock duration is 1 week, and only on Wednesdays. Disable days before next Wednesday after a week
        before: nextWednesday(addWeeks(new Date(), 1)),
      },
      ...this.getDaysExceptWednesday(),
    ];
  };

  public static calculateExpirationDate(
    currentWeek: number,
    weekLocked: number,
    cliff: number,
    slope: number,
  ): Date {
    // Calculate weeks passed since lock
    const weeksPassed = currentWeek - weekLocked;

    // Calculate remaining weeks in the vesting schedule
    const remainingWeeks = cliff + slope - weeksPassed;

    // Calculate the initial lock date by subtracting weeks passed from the start of the current week
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 3 });
    const initialLockDate = nextWednesday(
      subWeeks(startOfCurrentWeek, weeksPassed),
    );

    // Add the remaining weeks to the initial lock date
    let expirationDate = addWeeks(initialLockDate, remainingWeeks);

    return expirationDate;
  }
}
