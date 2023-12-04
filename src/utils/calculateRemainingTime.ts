export const calculateRemainingTime = (dueDate) => {
    let timeDeltaUTC = dueDate.getTime() - new Date().getTime() ; 
    const timeDeltaObj = new Date(timeDeltaUTC);
    return {timeDeltaObj, timeDeltaUTC};
}

export const calculateDueDate = (time) => {
    const data = new Date(time)

    if(data.getHours() <= 2){
        data.setDate(data.getDate() + 1)
        data.setHours(2, 0, 0, 0)

        const dueDate = data
        return dueDate
  
    } else {
        data.setDate(data.getDate() + 2)
        data.setHours(2, 0, 0, 0)

        const dueDate = data
        return dueDate
    }
  }

  export const calcCompleteStatusTime = (time) => {
    const data = new Date(time)

    if(data.getHours() <= 2){
        data.setHours(4, 0, 0, 0)
        const completeStatusTime = data
        return completeStatusTime
  
    } else {
        data.setDate(data.getDate() + 1)
        data.setHours(2, 0, 0, 0)
        const completeStatusTime = data
        return completeStatusTime
        
    }
  }

export const parseDate = (time) => {
    const parsedData = {
        date:time.getDate(),
        hours:time.getHours(),
        mins :time.getMinutes(),
        secs :time.getSeconds(),
    }

    return parsedData
}