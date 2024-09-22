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
      // Abrufen des States und der UUID
      const state = getState() as RootState; 
      const uuid = state.auth.uuid; 

      if (!uuid) {
        throw new Error("UUID is missing. Please ensure the user is authenticated.");
      }

      console.log("Fetching streaks for UUID:", uuid);

      // Firebase Query erstellen
      const q = query(collection(db, "streaks"), where("uuid", "==", uuid));
      
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q); // Daten abrufen
      } catch (dbError) {
        throw new Error(`Error querying Firebase: ${dbError.message}`);
      }

      if (querySnapshot.empty) {
        console.warn(`No streaks found for UUID: ${uuid}`);
      }

      const streaks: Streak[] = [];

      querySnapshot.forEach((doc) => {
        try {
          const data = doc.data();
          if (!data) {
            throw new Error(`No data found for document with ID: ${doc.id}`);
          }
          streaks.push({ id: doc.id, ...data } as Streak);
        } catch (docError) {
          console.error(`Error processing document with ID: ${doc.id}:`, docError);
        }
      });

      console.log("Fetched streaks:", streaks);

      // Daten im Redux Store aktualisieren
      dispatch(updateStreaksFromBackend(streaks));

      return streaks; // Erfolgreiche Rückgabe der Streak-Daten
    } catch (error) {
      // Umfassende Fehlerbehandlung
      console.error('Error fetching streaks:', error);
      
      let errorMessage = 'An unknown error occurred while fetching streaks.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
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


export const streaksSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    addNewStreak: (state, action: PayloadAction<Streak>) => {
      state.streaks.push(action.payload);
    },
    updateStreaksFromBackend: (state, action: PayloadAction<Streak[]>) => {
      state.streaks = action.payload;
    },
    deleteStreak: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const index = state.streaks.findIndex((streak) => streak.id === id);

      if (index !== -1) {
        state.streaks.splice(index, 1);
      }
      
      state.status = "idle" //ToDo: setzen status structure durch um backend kommunikation Ablauf zu verwalten
    },
    changeStreakStatus: (state, action: PayloadAction<{ id: string, status: StreakStatus }>) => {
      const { id, status } = action.payload;
      const index = state.streaks.findIndex((streak) => streak.id === id);

      if (index !== -1) {
        const updatedStreak = { ...state.streaks[index], status };
        state.streaks[index] = updatedStreak;
      }
    },
    completeStreak: (state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString();
      const index = state.streaks.findIndex((streak) => streak.id === action.payload);

      if (index !== -1) {
        const updatedStreak = {
          ...state.streaks[index],
          lastTimeUpdated: currentUtcTimestamp,
          count: state.streaks[index].count + 1,
          status: 'complete',
        };

        state.streaks[index] = updatedStreak;
      }
    },
    retryStreak: (state, action: PayloadAction<string>) => {
      const currentUtcTimestamp = new Date().toISOString();
      const index = state.streaks.findIndex((streak) => streak.id === action.payload);

      if (index !== -1) {
        const updatedStreak = {
          ...state.streaks[index],
          lastTimeUpdated: currentUtcTimestamp,
          count: 0,
          status: 'pending',
        };
        state.streaks[index] = updatedStreak;
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
        state.streaks = action.payload;  // Fixed this line, was reassigning `state` incorrectly
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