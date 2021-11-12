import { createContext, useState } from "react";
import User from "./types/user";

const nullUser: User = { id: 0, name: "", email: "", password: "" };

export const LoginContext = createContext({ signInUser: nullUser, isLoggedIn: false });

export default function LoginContextProvider(props: { children: JSX.Element }): JSX.Element {
  const [signInUser, setSignInUser] = useState(nullUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return <LoginContext.Provider value={{ signInUser, isLoggedIn }}>{props.children}</LoginContext.Provider>;
}
