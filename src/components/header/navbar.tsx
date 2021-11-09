import { useState, MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";
import RouteItems from "@/shared/routes/items/routeItems";
import imgLogout from "@/assets/images/header/logout.png";
import imgCart from "@/assets/images/header/cart.png";
import imgUser from "@/assets/images/header/user.png";
import User from "@/shared/types/user";
import Dropdown from "./dropdown";
import Login from "../users/login";
import Registration from "../users/registration";

export default function Navbar(props: {
  title: string;
  userName: string;
  onSignIn(user: User): void;
  onSignOut: VoidFunction;
  isLoggedIn: boolean;
}): JSX.Element {
  const [isShownDropdown, setIsShownDropdown] = useState(false);
  const [isShownSingIn, setIsShownSingIn] = useState(false);
  const [isShownSignUp, setIsShownSignUp] = useState(false);
  const history = useHistory();

  const handleLogoutButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.onSignOut();
    history.push(RouteItems.Home.url);
  };

  const handleSignInButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownSingIn(true);
  };

  const handleSignUpButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsShownSignUp(true);
  };

  const handleSignInButtonCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("signIn close");
    setIsShownSingIn(false);
  };

  const handleSignUpButtonCloseClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    alert("signUp close");
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
        {/* only for logged in user*/}
        <li
          className="dropdown"
          onMouseEnter={() => setIsShownDropdown(true)}
          onMouseLeave={() => setIsShownDropdown(false)}
          onKeyDownCapture={() => setIsShownDropdown(true)}
          onKeyUpCapture={() => setIsShownDropdown(false)}
        >
          <Link className="dropdown__link" to={RouteItems.Products.url}>
            {RouteItems.Products.id}
          </Link>
          {isShownDropdown ? <Dropdown /> : null}
        </li>
        {/* only for logged in user*/}
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.About.url}>
            {RouteItems.About.id}
          </Link>
        </li>
        {props.isLoggedIn ? (
          <>
            <li className="navbar__menu__li">
              <Link className="navbar__menu__link" to={RouteItems.Profile.url}>
                <img className="navbar__menu__icon" src={imgUser} alt="User" />
                {` ${props.userName}`}
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
        <Login onSignIn={props.onSignIn} onSignInButtonCloseClick={handleSignInButtonCloseClick} />
      ) : null}
      {isShownSignUp ? (
        <Registration onSignIn={props.onSignIn} onSignUpButtonCloseClick={handleSignUpButtonCloseClick} />
      ) : null}
    </nav>
  );
}
