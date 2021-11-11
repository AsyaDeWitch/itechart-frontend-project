import Login from "@/components/users/login";
import Modal from "@/elements/modal";
import { MouseEvent } from "react";
import { Route, RouteProps } from "react-router-dom";
import User from "../types/user";

export type ProtectedRouteProps = {
  isLoggedIn: boolean;
  onSignIn(user: User): void;
} & RouteProps;

export default function ProtectedRoute({ isLoggedIn, onSignIn, ...routeProps }: ProtectedRouteProps) {
  const handleSignInButtonCloseClick = (_: MouseEvent<HTMLButtonElement>) => {};

  if (isLoggedIn) {
    return <Route {...routeProps} />;
  }

  return (
    <Modal>
      <Login onSignIn={onSignIn} onSignInButtonCloseClick={handleSignInButtonCloseClick} />
    </Modal>
  );
}
