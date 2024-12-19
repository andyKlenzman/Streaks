import { ISOtimestamp } from "../shared/interfaces/general.interface";
import { isValidISOtimestamp } from "../shared/utils/isISOtimestamp";


export const calcTimeDifference = (time:Date): Date => {
    let timeDeltaUTC = time.getTime() - new Date().getTime() ; 
    const timeDifference = new Date(timeDeltaUTC);
    return timeDifference
}


/**
 * Local Function
 * Function returns the amount of time until the next due date.
 * 
 */
export const getTimeUntilStreakBroken = (lastTimeCompleted:ISOtimestamp): Date => {
    let dueDate: Date

    // if the last streak was completed before 2 am, set the due date until
    if(lastTimeCompleted.getHours() <= 2){
        lastTimeCompleted.setDate(lastTimeCompleted.getDate() + 1)
        lastTimeCompleted.setHours(2, 0, 0, 0)
        dueDate = lastTimeCompleted
    } else {
        lastTimeCompleted.setDate(lastTimeCompleted.getDate() +2)
        lastTimeCompleted.setHours(2, 0, 0, 0)
        dueDate = lastTimeCompleted
    }
    dueDate = calcTimeDifference(dueDate)
    return dueDate
  }


/**
 * Shared Function
 * Function returns the amount of time until the next due date. 
 */
export const getNextDueDate()
{




}

  export const getTimeUntilStatusChange = (time:ISOtimestamp) => {
    let timeObj = new Date(time)
    let timeWhenStatusChanges
    if(timeObj.getHours() <= 2){
        timeObj.setHours(4, 0, 0, 0)
        timeWhenStatusChanges = timeObj
        
  
    } else {
        timeObj.setDate(timeObj.getDate() + 1)
        timeObj.setHours(2, 0, 0, 0)
        timeWhenStatusChanges = timeObj
    }

    const timeUntilStatusChange = calcTimeDifference(timeWhenStatusChanges)
    return timeUntilStatusChange
  }


interface ParsedTime {
  hours: number,
  minutes: number,
  seconds: number
}
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