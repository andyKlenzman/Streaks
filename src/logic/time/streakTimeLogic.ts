import { Streak } from "../../shared/interfaces/streak.interface";
import { getTimeDifference } from "./timeUtils";

type ISOtimestamp = string;

/**
 * If a streak was completed on/after 2 AM (local), the due date is 2 days later at 2 AM;
 * otherwise it's 1 day later at 2 AM. 
 */
export const getStreakExpirationTime = (lastTimeStr: ISOtimestamp): Date => {
  const date = new Date(lastTimeStr); // note: date allows us to put the UTC time into local
  if (isNaN(date.getTime())) {
    throw new Error("Invalid lastTimeCompleted date");
  }

  if (date.getHours() >= 2) {
    date.setDate(date.getDate() + 2);
  } else {
    date.setDate(date.getDate() + 1);
  }
  date.setHours(2, 0, 0, 0); 
  return date;
};

/**
 * Returns a Date representing the difference between now (local time) and last completion.
 */
export const getStreakExpirationTimeDelta = (lastTimeStr: ISOtimestamp): Date => {
  const lastTime = new Date(lastTimeStr);
  if (isNaN(lastTime.getTime())) {
    throw new Error("Invalid lastTimeCompleted date");
  }
  return getTimeDifference(lastTime.getTime(), Date.now());
};

/**
 * A streak is expired if the time remaining until its expiration is <= 0.
 */
export const isStreakExpired = (lastTimeStr: ISOtimestamp): boolean => {
  return getStreakExpirationTimeDelta(lastTimeStr).getTime() <= 0;
};

/**
 * Create a "streak day index" by shifting the boundary to 2 AM local.
 * If it's before 2 AM local time, treat it as the previous calendar day.
 * We return a simple "year-month-day" string to compare.
 */
function getLocalStreakDayIndex(date: Date): string {
  const d = new Date(date);
  if (d.getHours() < 2) {
    d.setDate(d.getDate() - 1);
  }
  return [d.getFullYear(), d.getMonth(), d.getDate()].join("-");
}

/**
 * A user can complete a streak again if we're on a different "streak day"
 * than when they last completed. That switch happens at 2 AM local.
 */
export const isStreakCompletable = (streak: Streak): boolean => {
  if (!streak?.lastTimeCompleted) return false;

  const lastTime = new Date(streak.lastTimeCompleted);
  if (isNaN(lastTime.getTime())) return false;

  const currentDayIndex = getLocalStreakDayIndex(new Date());
  const lastCompletionIndex = getLocalStreakDayIndex(lastTime);
  return currentDayIndex !== lastCompletionIndex;
};
