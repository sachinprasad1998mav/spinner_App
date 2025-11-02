import reducer, { resetPlay, lockPlay } from "./gameSlice";
import { describe, it, expect } from "vitest";

describe("gameSlice", () => {
  it("initial canPlay is true", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.canPlay).toBe(true);
  });

  it("resetPlay keeps canPlay true", () => {
    const state = reducer({ canPlay: false }, resetPlay());
    expect(state.canPlay).toBe(true);
  });

  it("lockPlay no-ops to true (unlimited mode)", () => {
    const state = reducer({ canPlay: true }, lockPlay());
    expect(state.canPlay).toBe(true);
  });
});
