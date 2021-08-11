import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import bookSlice from "./bookSlice";
import cartSlice from "./cartSlice";
import modalSlice from "./modalSlice";
import errorReducer from "./errorSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    books: bookSlice.reducer,
    cart: cartSlice.reducer,
    modal: modalSlice.reducer,
    error: errorReducer,
  },
});

export default store;
