import reducer, { setRewards, addReward, type Reward } from "./rewardSlice";
import { describe, it, expect } from "vitest";

describe("rewardsSlice", () => {
  it("sets rewards array", () => {
    const items: Reward[] = [
      { id: "1", label: "Bronze", points: 10, status: "earned", ts: 1 },
    ];
    const state = reducer({ items: [] }, setRewards(items));
    expect(state.items).toHaveLength(1);
  });

  it("adds a reward at the front", () => {
    const r: Reward = {
      id: "2",
      label: "Gold",
      points: 50,
      status: "earned",
      ts: 2,
    };
    const state = reducer({ items: [] }, addReward(r));
    expect(state.items[0]).toEqual(r);
  });
});
