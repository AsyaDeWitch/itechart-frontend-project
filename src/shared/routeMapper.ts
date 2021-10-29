import Home from "@/components/info/home";
import About from "@/components/info/about";
import Games from "@/components/products/games";
import Routes from "./routes";
import RouteMapElemenet from "./routeMapElemenet";

const RouteMapper: RouteMapElemenet = {
  Home: { component: Home, url: Routes.Home },
  Products: { component: Games, url: Routes.Products },
  About: { component: About, url: Routes.About },
};

export default RouteMapper;
