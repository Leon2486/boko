import { createSlice } from "@reduxjs/toolkit";

const modalInitialState = { show: false, message: "", changed: true };

const modalSlice = createSlice({
  name: "modal",
  initialState: modalInitialState,
  reducers: {
    openModal(state, action) {
      state.show = true;
      state.message = action.payload;
      state.changed = !state.changed;
    },
    closeModal(state) {
      state.show = false;
      state.changed = !state.changed;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
