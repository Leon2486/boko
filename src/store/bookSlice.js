import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const bookInitialState = { genre: [], mybooks: {}, list: [], loading: false };

const bookSlice = createSlice({
  name: "book",
  initialState: bookInitialState,
  reducers: {
    fetchSearch(state, action) {
      state.list = action.payload;
    },
    fetchGenre(state, action) {
      state.genre = action.payload;
    },
    fetchEbook(state, action) {
      state.list[action.payload.itemNumber] = action.payload;
    },
    fetchEbooks(state, action) {
      state.list = { ..._.mapKeys(action.payload, "itemNumber") };
    },
    fetchMyBook(state, action) {
      state.mybooks = action.payload;
    },
    purchaseBook(state, action) {
      state.mybooks = { ...state.mybooks, ...action.payload };
    },
    loadingStart(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice;
