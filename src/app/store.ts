import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import rewardsReducer from "../features/rewards/rewardSlice";
import gameReducer from "../features/game/gameSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rewards: rewardsReducer,
    game: gameReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
