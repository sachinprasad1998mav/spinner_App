import { createSlice } from "@reduxjs/toolkit";

type GameState = { canPlay: boolean };
const initialState: GameState = { canPlay: true };

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    lockPlay(state) {
      state.canPlay = true;
    },
    resetPlay(state) {
      state.canPlay = true;
    },
  },
});

export const { lockPlay, resetPlay } = gameSlice.actions;
export default gameSlice.reducer;
