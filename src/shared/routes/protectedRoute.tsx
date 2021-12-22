import { useState } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "@/components/users/modals/login";
import Modal from "@/elements/modal";
import Home from "@/components/home/home";
import { TStore } from "@/redux/store";
import RouteItems from "./items/routeItems";

export default function ProtectedRoute({ ...routeProps }: RouteProps): JSX.Element {
  const [isShownSingIn, setIsShownSingIn] = useState(true);
  const history = useHistory();
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

  if (!isLoggedIn) {
    history.push(RouteItems.Home.url);
  }
  return <></>;
}
