import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import bookReducer from "./bookReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";

export default combineReducers({
  cart: cartReducer,
  books: bookReducer,
  auth: authReducer,
  error: errorReducer,
  loading: loadingReducer,
});
