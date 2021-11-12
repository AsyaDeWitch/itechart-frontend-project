import Login from "@/components/users/login";
import Modal from "@/elements/modal";
import Home from "@/home/home";
import { useState, MouseEvent } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import User from "../types/user";
import RouteItems from "./items/routeItems";

export type ProtectedRouteProps = {
  isLoggedIn: boolean;
  onSignIn(user: User): void;
} & RouteProps;

export default function ProtectedRoute({ isLoggedIn, onSignIn, ...routeProps }: ProtectedRouteProps): JSX.Element {
  const [isShownSingIn, setIsShownSingIn] = useState(true);
  const history = useHistory();

  const handleSignInButtonCloseClick = (_: MouseEvent<HTMLButtonElement>) => {
    setIsShownSingIn(false);
    if (!isLoggedIn) history.push(RouteItems.Home.url);
  };

  if (isLoggedIn) {
    return <Route {...routeProps} />;
  }

  if (isShownSingIn)
    return (
      <>
        <Home />
        <Modal>
          <Login onSignIn={onSignIn} onSignInButtonCloseClick={handleSignInButtonCloseClick} />
        </Modal>
      </>
    );

  return <></>;
}
