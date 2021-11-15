import { createContext, useState } from "react";
import User from "./types/user";

const nullUser: User = { id: 0, name: "", email: "", password: "" };

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setSignInData = (newSignInUser: User): void => {
    setIsLoggedIn(true);
    setSignInUser(newSignInUser);
  };

  const setSignOutData = (): void => {
    setIsLoggedIn(false);
    setSignInUser(nullUser);
  };

  return (
    <LoginContext.Provider value={{ signInUser, isLoggedIn, setSignInData, setSignOutData }}>
      {props.children}
    </LoginContext.Provider>
  );
}
