import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  showIntro: boolean;
  activeStreakId: string | null;
}

const initialState: UIState = {
  showIntro: true, // Standardmäßig wird das Intro beim ersten Start angezeigt
  activeStreakId: null, // Speichert die aktuell geöffnete Streak
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    hideIntro: (state) => {
      state.showIntro = false; // Intro wird nach dem ersten Anzeigen versteckt
    },
    resetIntro: (state) => {
      state.showIntro = true; // Zum Debuggen kann das Intro zurückgesetzt werden
    },
    openStreak: (state, action: PayloadAction<string>) => {
      state.activeStreakId = action.payload; // Speichert die ID der geöffneten Streak
    },
  },
});

export const { hideIntro, resetIntro, openStreak } = uiSlice.actions;
export default uiSlice.reducer;
