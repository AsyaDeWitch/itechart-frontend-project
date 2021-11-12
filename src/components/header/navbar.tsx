import { useState, MouseEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import "./header.scss";
import RouteItems from "@/shared/routes/items/routeItems";
import imgLogout from "@/assets/images/header/logout.png";
import imgCart from "@/assets/images/header/cart.png";
import imgUser from "@/assets/images/header/user.png";
import Modal from "@/elements/modal";
import Dropdown from "./dropdown";
import Login from "../users/login";
import Registration from "../users/registration";

export default function Navbar(props: {
  title: string;
  userName: string;
  // onSignIn(user: User): void;
  // onSignOut: VoidFunction;
  // isLoggedIn: boolean;
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

  const handleSignInButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    setIsShownSingIn(true);
  };

  const handleSignUpButtonClick = (_: MouseEvent<HTMLButtonElement>) => {
    setIsShownSignUp(true);
  };

  const handleSignInButtonCloseClick = (_: MouseEvent<HTMLButtonElement>) => {
    setIsShownSingIn(false);
  };

  const handleSignUpButtonCloseClick = (_: MouseEvent<HTMLButtonElement>) => {
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
                {props.userName.length <= 10 ? ` ${props.userName}` : ` ${props.userName.slice(0, 6)}...`}
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
          <Login onSignIn={props.onSignIn} onSignInButtonCloseClick={handleSignInButtonCloseClick} />
        </Modal>
      ) : null}
      {isShownSignUp ? (
        <Modal>
          <Registration onSignIn={props.onSignIn} onSignUpButtonCloseClick={handleSignUpButtonCloseClick} />
        </Modal>
      ) : null}
    </nav>
  );
}
