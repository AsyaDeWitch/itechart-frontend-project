import RouteItem from "./routeItem";
import Routes from "../routes";

const RouteItems: RouteItem = {
  Home: { url: Routes.Home, id: "Home" },
  Products: { url: Routes.Products, id: "Games" },
  About: { url: Routes.About, id: "About" },
  Profile: { url: Routes.Profile, id: "Profile" },
  Cart: { url: Routes.Cart, id: "Cart" },
};

export default RouteItems;
