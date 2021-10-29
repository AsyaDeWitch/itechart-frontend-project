import { ComponentType } from "react";

type UrlComponent = {
  component: ComponentType;
  url: string;
};

type RouteMapElemenet = {
  [componentName: string]: UrlComponent;
};

export default RouteMapElemenet;
