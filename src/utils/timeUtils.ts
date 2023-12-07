export const calcTimeDifference = (time) => {
    let timeDeltaUTC = time.getTime() - new Date().getTime() ; 
    const timeDifference = new Date(timeDeltaUTC);
    return timeDifference
}

export const getTimeUntilStreakBroken = (time) => {
    const data = new Date(time)
    let dueDate

    if(data.getHours() <= 2){
        data.setDate(data.getDate() + 1)
        data.setHours(2, 0, 0, 0)
        dueDate = data
        
  
    } else {
      console.log('to')
        data.setDate(data.getDate() +2)
        data.setHours(2, 0, 0, 0)
        dueDate = data
    }
    dueDate = calcTimeDifference(dueDate)
    return dueDate
  }

  export const getTimeUntilStatusChange = (time) => {
    const data = new Date(time)
    let timeWhenStatusChanges
    if(data.getHours() <= 2){
        data.setHours(4, 0, 0, 0)
        timeWhenStatusChanges = data
        
  
    } else {
        data.setDate(data.getDate() + 1)
        data.setHours(2, 0, 0, 0)
        timeWhenStatusChanges = data
    }

    const timeUntilStatusChange = calcTimeDifference(timeWhenStatusChanges)
    return timeUntilStatusChange
  }

export const parseTime = (time) => {


    const totalSeconds = Math.floor(time / 1000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds
  };

}