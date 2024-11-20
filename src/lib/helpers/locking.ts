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
import { MAX_LOCKING_DURATION_WEEKS } from "../constants/locking";

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

  public static calculateMaxExtensionWeeks(
    currentLockingWeek: number,
    lockTime: number | undefined,
    lockSlope: number | undefined,
  ): number {
    if (lockTime === undefined || lockSlope === undefined) {
      return 0;
    }

    const weeksPassed = currentLockingWeek - lockTime;
    const remainingWeeks = MAX_LOCKING_DURATION_WEEKS - lockSlope;
    return Math.max(remainingWeeks + weeksPassed, 0);
  }

  public static calculateExpirationDate(
    currentWeek: number,
    weekLocked: number,
    cliff: number,
    slope: number,
  ): Date {
    // Get the start of the current week (Wednesday-based)
    const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 3 });

    const totalLockDuration = cliff + slope;

    const weeksPassed = currentWeek - weekLocked;

    const lockStartDate = subWeeks(startOfCurrentWeek, weeksPassed);

    return addWeeks(lockStartDate, totalLockDuration);
  }
}
