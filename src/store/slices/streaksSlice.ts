import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {Streak, Streaks} from '../../shared/interfaces/streak.interface'
import { StreakFormInput } from '../../shared/interfaces/streak.interface'

// Define a type for the slice state

// Define the initial state using that type
const initialState: Streaks = [{  id: '0',
              title: 'No screens before bed',
              count: 0,
              status: 'pending',
              partner: ''
          }]


export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<StreakFormInput>) => {
      const newStreak:Streak = {
        id: '1',
        title: action.payload.title,
        count: 0,
        status: 'pending',
        partner: ''

      }
       state.push(newStreak)
    },
    deleteStreak: (state, action: PayloadAction<string>) => {
       state.find((streak: { id: string; }) => streak.id === action.payload)
    }
  }
})

export const { addNewStreak, deleteStreak } = streaksSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.streaks

export default streaksSlice.reducer