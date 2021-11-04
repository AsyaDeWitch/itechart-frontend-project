import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import RouteItems from "@/shared/routes/items/routeItems";
import Dropdown from "./dropdown";

export default function Navbar(props: { title: string }): JSX.Element {
  const [isShown, setIsShown] = useState(false);

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
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onKeyDownCapture={() => setIsShown(true)}
          onKeyUpCapture={() => setIsShown(false)}
        >
          <Link className="dropdown__link" to={RouteItems.Products.url}>
            {RouteItems.Products.id}
          </Link>
          {isShown ? <Dropdown /> : null}
        </li>
        <li className="navbar__menu__li">
          <Link className="navbar__menu__link" to={RouteItems.About.url}>
            {RouteItems.About.id}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
