import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import Streaks from '../../shared/interfaces/streaks.interfaces'
import Streak from '../../shared/interfaces/streak.interface'
// Define a type for the slice state

// Define the initial state using that type
const initialState: Streaks = [{  id: '0',
              title: 'No screens before bed',
              count: 0,
              status: 'pending'
          }]


export const streaksSlice = createSlice({
  name: 'streaks',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    addStreak: (state, action: PayloadAction<Streak>) => {
       state.push(action.payload)
    },
    deleteStreak: (state, action: PayloadAction<string>) => {
       state.find((streak: { id: string; }) => streak.id === action.payload)
    }
  }
})

export const { addStreak, deleteStreak } = streaksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.streaks

export default streaksSlice.reducer