import User from "@/shared/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nullUserId = 0;
const nullUser: User = { id: nullUserId, name: "", role: "" };

interface LoggingState {
  signInUser: User;
  isLoggedIn: boolean;
}

const initialState = { signInUser: nullUser, isLoggedIn: false } as LoggingState;

const loggingSlice = createSlice({
  name: "logging",
  initialState,
  reducers: {
    setSignInData(state, action: PayloadAction<User>) {
      return {
        ...state,
        signInUser: action.payload,
        isLoggedIn: true,
      };
    },
    setSignOutData(state) {
      return {
        ...state,
        signInUser: nullUser,
        isLoggedIn: false,
      };
    },
  },
});

export const { setSignInData, setSignOutData } = loggingSlice.actions;
export default loggingSlice.reducer;
