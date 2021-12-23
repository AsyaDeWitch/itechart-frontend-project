import { memo, useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../header.scss";
import imgLogout from "images/header/logout.png";
import imgCart from "images/header/cart.png";
import imgUser from "images/header/user.png";
import { useDispatch, useSelector } from "react-redux";
import RouteItems from "@/shared/routes/items/routeItems";
import Modal from "@/elements/modal";
import { setSignOutData } from "@/redux/slices/loggingSlice";
import { TStore } from "@/redux/store";
import Login from "@/components/users/modals/login";
import Registration from "@/components/users/modals/registration";
import Dropdown from "./dropdown";

const MemoizedNavbar = memo((props: { title: string }): JSX.Element => {
  const [isShownSingIn, setIsShownSingIn] = useState(false);
  const [isShownSignUp, setIsShownSignUp] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const { cartItemsQuantity } = useSelector((state: TStore) => state.reducer.cartReducer);

  const memoizedLogoutButtonClickHandler = useCallback(() => {
    dispatch(setSignOutData());
    history.push(RouteItems.Home.url);
  }, []);

  const memoizedSignInButtonClickHandler = useCallback(() => {
    setIsShownSingIn(true);
  }, []);

  const memoizedSignUpButtonClickHandler = useCallback(() => {
    setIsShownSignUp(true);
  }, []);

  const memoizedSignInButtonCloseClickHandler = useCallback(() => {
    setIsShownSingIn(false);
  }, []);

  const memoizedSignUpButtonCloseClickHandler = useCallback(() => {
    setIsShownSignUp(false);
  }, []);

  return (
    <nav className="navbar">
      <h2 className="navbar__title">{props.title}</h2>
      <ul className="navbar__menu">
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.Home.url}>
            {RouteItems.Home.name}
          </Link>
        </li>
        <li className="dropdown">
          <Link className="dropdown__link" to={RouteItems.Products.url}>
            {RouteItems.Products.name}
          </Link>
          <Dropdown />
        </li>
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.About.url}>
            {RouteItems.About.name}
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
                <span className="navbar__menu__quantity">{` ${cartItemsQuantity}`}</span>
              </Link>
            </li>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={memoizedLogoutButtonClickHandler}>
                <img className="navbar__menu__icon" src={imgLogout} alt="Logout" />
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={memoizedSignInButtonClickHandler}>
                Sign In
              </button>
            </li>
            <li className="navbar__menu__li">
              <button className="navbar__menu__button" type="button" onClick={memoizedSignUpButtonClickHandler}>
                Sign Up
              </button>
            </li>
          </>
        )}
      </ul>
      {isShownSingIn ? (
        <Modal>
          <Login onSignInButtonCloseClick={memoizedSignInButtonCloseClickHandler} />
        </Modal>
      ) : null}
      {isShownSignUp ? (
        <Modal>
          <Registration onSignUpButtonCloseClick={memoizedSignUpButtonCloseClickHandler} />
        </Modal>
      ) : null}
    </nav>
  );
});

MemoizedNavbar.displayName = "Navbar";

export default MemoizedNavbar;
