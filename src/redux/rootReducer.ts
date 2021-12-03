import { combineReducers } from "@reduxjs/toolkit";
import loggingReducer from "./slices/loggingSlice";
import cartReducer from "./slices/cartSlice";
import productsReducer from "./slices/productsSlice";

const rootReducer = combineReducers({
  loggingReducer,
  cartReducer,
  productsReducer,
});

export default rootReducer;
