import { ParsedTime } from "../../shared/interfaces/time.interfaces";  


export const parseTime = (time: Date): ParsedTime => {
    const timeUTC = time.getTime()
    const totalSeconds = Math.floor(timeUTC / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    return {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  
  }


/**
 * Calculates the time difference between two timestamps and returns it as an object.
 * @param startTime - The starting time as a Date object.
 * @param endTime - The ending time as a Date object.
 * @returns A Date object representing the difference in time.
 */
export const getTimeDifference = (startTime: Date, endTime: Date): Date => {
  const deltaMilliseconds = Math.abs(endTime.getTime() - startTime.getTime()); // Ensure positive difference
  const deltaDate = new Date(deltaMilliseconds);

  // Normalize the Date object to reflect the difference (UTC time to local offset)
  deltaDate.setUTCHours(deltaDate.getUTCHours() - deltaDate.getTimezoneOffset() / 60);
  deltaDate.setUTCFullYear(1970, 0, 1); // Reset to base time in UTC

  return deltaDate;
};