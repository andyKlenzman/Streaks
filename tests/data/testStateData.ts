import { currentTime, pastStreakDeadline } from "../../src/utils/test.timeUtils";
import { RootState } from "../../src/store/store";


export const initialState:RootState= {
    streaks: [
      { id: '1', title: 'do a pushup', count: 54, status: 'pending', time: currentTime },
      { id: '2', title: 'talk to someone new', count: 3, status: 'broken', time: pastStreakDeadline },
      { id: '3', title: 'be nice', count: 43, status: 'pending', time: currentTime },
      { id: '4', title: 'stretch', count: 2, status: 'pending', time: pastStreakDeadline },
      { id: '5', title: 'stretch', count: 2, status: 'pending', time: currentTime },
    ]
  };