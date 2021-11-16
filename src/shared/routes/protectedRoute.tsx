import Login from "@/components/users/login";
import Modal from "@/elements/modal";
import Home from "@/home/home";
import { useState, useContext } from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { LoginContext } from "@/shared/loginContext";
import RouteItems from "./items/routeItems";

export default function ProtectedRoute({ ...routeProps }: RouteProps): JSX.Element {
  const [isShownSingIn, setIsShownSingIn] = useState(true);
  const history = useHistory();
  const { isLoggedIn } = useContext(LoginContext);

  const handleSignInButtonCloseClick = () => {
    setIsShownSingIn(false);
    if (!isLoggedIn) {
      history.push(RouteItems.Home.url);
    }
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
