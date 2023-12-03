//This files contains time stamps for various important states for each streak, which will be used for testing


const now = new Date()
export const currentTime = now.toISOString()



const sixHoursLater = new Date().setHours(now.getHours() - 6)
export const laterTime = new Date(sixHoursLater).toISOString()


const twentyFiveHoursLater = new Date().setHours(now.getHours() - 25)

export const pastStreakDeadline = new Date(twentyFiveHoursLater).toISOString()




