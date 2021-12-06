import Login from "@/components/users/modals/login";
import Modal from "@/elements/modal";
import Home from "@/components/home/home";
import { TStore } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, RouteProps } from "react-router-dom";

export default function ProtectedRoute({ ...routeProps }: RouteProps): JSX.Element {
  const [isShownSingIn, setIsShownSingIn] = useState(true);
  const { isLoggedIn } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const handleSignInButtonCloseClick = () => {
    setIsShownSingIn(false);
  };

  if (isLoggedIn) {
    return <Route {...routeProps} />;
  }

  if (isShownSingIn)
    return (
      <>
        <Home />
        <Modal>
          <Login onSignInButtonCloseClick={handleSignInButtonCloseClick} />
        </Modal>
      </>
    );

  return <></>;
}
