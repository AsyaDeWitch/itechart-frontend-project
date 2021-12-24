import RouteItem from "./routeItem";
import Routes from "../routes";

const RouteItems: RouteItem = {
  Home: { url: Routes.Home, name: "Home" },
  Products: { url: Routes.Products, name: "Games" },
  About: { url: Routes.About, name: "About" },
  Profile: { url: Routes.Profile, name: "Profile" },
  Cart: { url: Routes.Cart, name: "Cart" },
};

export default RouteItems;
