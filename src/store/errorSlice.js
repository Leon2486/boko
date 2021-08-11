import { createSlice } from "@reduxjs/toolkit";

const errorInitialState = { status: null, message: "" };

const errorSlice = createSlice({
  name: "error",
  initialState: errorInitialState,
  reducers: {
    foundError(state, action) {
      state.message = action.payload;
    },
  },
});

export const errorActions = errorSlice.actions;

export default errorSlice.reducer;
