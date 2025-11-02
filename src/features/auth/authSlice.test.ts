import reducer, { setUser, logout } from "./authSlice";
import { describe, it, expect } from "vitest";

describe("authSlice", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "@@INIT" });
    expect(state).toEqual({ user: null });
  });

  it("should set user", () => {
    const user = { name: "User 1234", mobile: "999991234" };
    const state = reducer({ user: null }, setUser(user));
    expect(state.user).toEqual(user);
  });

  it("should logout", () => {
    const prev = { user: { name: "User 1234", mobile: "999991234" } };
    const state = reducer(prev, logout());
    expect(state.user).toBeNull();
  });
});
