import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const cartInitialState = { showCart: false, cartItem: {}, loading: false };

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    closeCart(state) {
      state.showCart = false;
    },
    addCart(state, action) {
      state.cartItem[action.payload.itemNumber] = action.payload;
    },
    removeCart(state, action) {
      state.cartItem = _.omit(state.cartItem, action.payload);
    },
    fetchCart(state, action) {
      state.cartItem = action.payload;
    },
    emptyCart(state) {
      state.cartItem = {};
    },
    loadingStart(state) {
      state.loading = true;
    },
    loadingEnd(state) {
      state.loading = false;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
