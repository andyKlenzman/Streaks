/**
 * 
 *Okay so this is why all of this stuff isconfusing... It is all a different type. They should all take a date object, unless otherwise needed. 
 */
import { ISOtimestamp } from "../shared/interfaces/general.interface";
import { isValidISOtimestamp } from "../shared/utils/isISOtimestamp";


export const calcTimeDifference = (time:Date): Date => {
    let timeDeltaUTC = time.getTime() - new Date().getTime() ; 
    const timeDifference = new Date(timeDeltaUTC);
    return timeDifference
}

export const getTimeUntilStreakBroken = (time:Date): Date => {
    let dueDate: Date
    if(time.getHours() <= 2){
        time.setDate(time.getDate() + 1)
        time.setHours(2, 0, 0, 0)
        dueDate = time
    } else {
        time.setDate(time.getDate() +2)
        time.setHours(2, 0, 0, 0)
        dueDate = time
    }
    dueDate = calcTimeDifference(dueDate)
    return dueDate
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