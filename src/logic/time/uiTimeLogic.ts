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
    
    