import { createSlice } from "@reduxjs/toolkit";

const authInitialState = { isSignedIn: null, userId: null };

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    signIn(state, action) {
      state.isSignedIn = true;
      state.userId = action.payload;
    },
    signOut(state) {
      state.isSignedIn = false;
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
