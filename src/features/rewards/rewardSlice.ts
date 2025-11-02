import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Reward = {
  id: string;
  label: string;
  points: number;
  status: "earned" | "pending";
  ts: number;
};

type RewardsState = {
  items: Reward[];
};

const initialState: RewardsState = {
  items: [],
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    setRewards(state, action: PayloadAction<Reward[]>) {
      state.items = action.payload;
    },
    addReward(state, action: PayloadAction<Reward>) {
      state.items.unshift(action.payload);
    },
  },
});

export const { setRewards, addReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;
