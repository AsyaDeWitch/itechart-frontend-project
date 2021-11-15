import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";
import RouteItems from "@/shared/routes/items/routeItems";
import imgLogout from "@/assets/images/header/logout.png";
import imgCart from "@/assets/images/header/cart.png";
import imgUser from "@/assets/images/header/user.png";
import Modal from "@/elements/modal";
import { LoginContext } from "@/shared/loginContext";
import Dropdown from "./dropdown";
import Login from "../users/login";
import Registration from "../users/registration";

export default function Navbar(props: { title: string }): JSX.Element {
  const [isShownSingIn, setIsShownSingIn] = useState(false);
  const [isShownSignUp, setIsShownSignUp] = useState(false);
  const history = useHistory();
  const { signInUser, isLoggedIn, setSignOutData } = useContext(LoginContext);

  const handleLogoutButtonClick = () => {
    setSignOutData();
    history.push(RouteItems.Home.url);
  };

  const handleSignInButtonClick = () => {
    setIsShownSingIn(true);
  };

  const handleSignUpButtonClick = () => {
    setIsShownSignUp(true);
  };

  const handleSignInButtonCloseClick = () => {
    setIsShownSingIn(false);
  };

  const handleSignUpButtonCloseClick = () => {
    setIsShownSignUp(false);
  };

  return (
    <nav className="navbar">
      <h2 className="navbar__title">{props.title}</h2>
      <ul className="navbar__menu">
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.Home.url}>
            {RouteItems.Home.id}
          </Link>
        </li>
        <li className="dropdown">
          <Link className="dropdown__link" to={RouteItems.Products.url}>
            {RouteItems.Products.id}
          </Link>
          <Dropdown />
        </li>
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.About.url}>
            {RouteItems.About.id}
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li className="navbar__menu__li">
              <Link className="navbar__menu__link" to={RouteItems.Profile.url}>
                <img className="navbar__menu__icon" src={imgUser} alt="User" />
                <span className="navbar__menu__userName">{` ${signInUser.name}`}</span>
              </Link>
            </li>
            <li className="navbar__menu__li">
              <Link className="navbar__menu__link" to={RouteItems.Cart.url}>
                <img className="navbar__menu__icon" src={imgCart} alt="Cart" />
              </Link>
            </li>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={handleLogoutButtonClick}>
                <img className="navbar__menu__icon" src={imgLogout} alt="Logout" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={handleSignInButtonClick}>
                Sign In
              </button>
            </li>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={handleSignUpButtonClick}>
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
      {isShownSingIn ? (
        <Modal>
          <Login onSignInButtonCloseClick={handleSignInButtonCloseClick} />
        </Modal>
      ) : null}
      {isShownSignUp ? (
        <Modal>
          <Registration onSignUpButtonCloseClick={handleSignUpButtonCloseClick} />
        </Modal>
      ) : null}
    </nav>
  );
}
