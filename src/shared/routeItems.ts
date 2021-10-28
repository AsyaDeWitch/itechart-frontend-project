import RouteItem from "./routeItem";
import Routes from "./routes";

const RouteItems = [
  new RouteItem("0", "Home", Routes[0], "navbar__menu__links"),
  new RouteItem("1", "Products", Routes[1], "navbar__menu__links"),
  new RouteItem("2", "About", Routes[2], "navbar__menu__links"),
];

export default RouteItems;
