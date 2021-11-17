import { combineReducers } from "@reduxjs/toolkit";
import loggingReducer from "./slices/loggingSlice";

const rootReducer = combineReducers({
  loggingReducer,
});

export default rootReducer;
