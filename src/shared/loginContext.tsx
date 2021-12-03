import { createContext, useState } from "react";
import User from "./types/user";

const nullUserId = 0;
const nullUser: User = { id: nullUserId, name: "" };

export const LoginContext = createContext({
  signInUser: nullUser,
  isLoggedIn: false,
  setSignInData: (newSignInUser: User) => {
    console.log(`Sign in failed ${newSignInUser}`);
  },
  setSignOutData: () => {
    console.log("Sign out failed");
  },
});

export default function LoginContextProvider(props: { children: JSX.Element }): JSX.Element {
  const [signInUser, setSignInUser] = useState(nullUser);

  const setSignInData = (newSignInUser: User): void => {
    setSignInUser(newSignInUser);
  };

  const setSignOutData = (): void => {
    setSignInUser(nullUser);
  };

  return (
    <LoginContext.Provider
      value={{ signInUser, isLoggedIn: signInUser.id !== nullUserId, setSignInData, setSignOutData }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
