/**
 * This file contains the core logic determining the status of a Streak
 * and utilities for understanding the time status of the streak
 */


import { getTimeDifference } from "./timeUtils"


export const getStreakExpirationTime = (lastTimeCompleted:ISOtimestamp): Date => {
    let expirationTime: Date
    
    // if the Streak was completed within 2:00:00AM and 11:59:59PM, the streak is due in 2 days at 2AM.
    if(lastTimeCompleted.getHours() >= 2 && 
      (lastTimeCompleted.getHours() < 24 && 
      lastTimeCompleted.getMinutes() <59 && 
      lastTimeCompleted.getSeconds() < 59))
    {
        lastTimeCompleted.setDate(lastTimeCompleted.getDate() +2)
    }
  
    // if the streak was completed before 2AM, the day needs only be incremented by one.
    if(lastTimeCompleted.getHours() < 2) 
    {
        lastTimeCompleted.setDate(lastTimeCompleted.getDate() + 1)
        expirationTime = lastTimeCompleted
    }
  
    // set the due date to 2am
    lastTimeCompleted.setHours(2, 0, 0, 0) 
  
    expirationTime = lastTimeCompleted
  
    return expirationTime
  }
  




// returns the delta between current time and last time completed. 
  export const getStreakExpirationTimeDelta = (lastTimeCompleted:ISOtimestamp): Date => {
    let delta: Date
    const currentTime = new Date();
  
    delta = getTimeDifference(lastTimeCompleted.getTime(), currentTime.getTime());
  
    return delta
  }
  




  
export const getIsStreakExpired = (lastTimeCompleted: ISOtimestamp): boolean => {
      const delta = getStreakExpirationTimeDelta(lastTimeCompleted);
  
      // Check if the time delta is less than or equal to zero
      return delta.getTime() <= 0;
  };
  

  
  


