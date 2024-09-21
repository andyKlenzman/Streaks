import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Streak, StreaksState, StreakStatus } from '../../shared/interfaces/general.interface';
import { db } from '../../firebase/fbInit';
import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
// Define initial state
const initialState: StreaksState = {
  streaks: [], // Assuming you store streaks in an array
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};




export const fetchStreaks = createAsyncThunk(
  'streaks/fetchStreaks',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const state = getState() as RootState; 
      const uuid = state.auth.uuid; 

      const q = query(collection(db, "streaks"), where("uuid", "==", uuid));
      const querySnapshot = await getDocs(q);
      
      const streaks: Streak[] = [];
      
      querySnapshot.forEach((doc) => {
        streaks.push({ id: doc.id, ...doc.data() } as Streak);
      });

      dispatch(updateStreaksFromBackend(streaks))
      
      return streaks; // Erfolgreiche Rückgabe der Streak-Daten
    } catch (error) {
      console.error('Error fetching streaks from Firebase:', error);
      return rejectWithValue(error.message);
    }
  }
);

// createAsyncThunk für das Hinzufügen eines neuen Streaks
export const submitNewStreak = createAsyncThunk(
  'streaks/submitNewStreak',
  async (values: StreakFormInput, { dispatch, getState, rejectWithValue }) => {
    try {

      // Referenz zur 'streaks'-Collection in Firebase
      const streaksRef = collection(db, "streaks");
      const newStreakRef = doc(streaksRef); // Neue ID wird erstellt
      const streakId = newStreakRef.id; // Generierte ID abrufen

      
      const state = getState() as RootState; 
      const uuid = state.auth.uuid; 
      console.log("AUTH STATE",state.auth);


      const streakData: Streak = {
        id: streakId,
        uuid,
        title: values.title,
        count: 0,
        status: "pending",
        lastTimeUpdated: new Date().toISOString(),
        isShared: false,
      };

      // Streak-Daten in Firebase speichern
      await setDoc(newStreakRef, streakData);

      // Den neuen Streak in Redux speichern
      dispatch(addNewStreak(streakData));

      return streakData; // Erfolg: Rückgabe des neuen Streaks
    } catch (error) {
      console.error('Error adding streak to Firebase:', error);
      return rejectWithValue(error.message);

      //ToDo: fügen Kapitenz arbeit zu reinigen, wenn es nicht funktionert. Vielliecht den Daten in Firestore zu Löschen, yum Biespiel. 
    }
  }
);


// Slice definition
export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<Streak>) => {
      console.log("State in the addNewStreak: ", state)
      state.streaks.push(action.payload);
    },
    updateStreaksFromBackend: (state, action: PayloadAction<Streak[]>) => {
      console.log("updateStreaksFromBackend. Payload: ", action.payload)
      state.streaks = action.payload;


    },
    deleteStreak: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      console.log(action.payload, state)

      
      const index = state.streaks.findIndex((streak) => streak.id === id);
      if (index !== -1) {
        state.streaks.splice(index, 1) }
    },
    changeStreakStatus: (state, action: PayloadAction<{ id: string, status: StreakStatus }>) => {
      const { id, status } = action.payload;
      const index = state.streaks.findIndex((streak) => streak.id === id);

      // TODo: irgendwie das fixieren 
      if (index !== -1) {
        state.streaks[index] = { ...state[index], status };
      }
    },
    completeStreak: (state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString();
      const index = state.findIndex((streak) => streak.id === action.payload);
      if (index !== -1) {
        const updatedStreak: Streak = {
          ...state[index],
          lastTimeUpdated: currentUtcTimestamp,
          count: state[index].count + 1,
          status: 'complete',
        };
        state[index] = updatedStreak;
      }
    },
    retryStreak: (state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString();
      const index = state.findIndex((streak) => streak.id === action.payload);
      if (index !== -1) {
        const updatedStreak: Streak = {
          ...state[index],
          lastTimeUpdated: currentUtcTimestamp,
          count: 0,
          status: 'pending',
        };
        state[index] = updatedStreak;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStreaks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStreaks.fulfilled, (state, action: PayloadAction<Streak[]>) => {
        state.status = 'succeeded';
        state = action.payload;
      })
      .addCase(fetchStreaks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch streaks';
      });
  },
});

// Export actions and reducer
export const { addNewStreak, deleteStreak, changeStreakStatus, completeStreak, retryStreak, updateStreaksFromBackend } = streaksSlice.actions;
export default streaksSlice.reducer;