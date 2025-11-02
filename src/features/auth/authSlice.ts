import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
type User = {
  name: string;
  mobile: string;
} | null;

type AuthState = {
  user: User;
};

function loadUser(): User {
  try {
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as { name: string; mobile: string }) : null;
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  user: loadUser(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
