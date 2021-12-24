type Url = {
  url: string;
  name: string;
};

type RouteItem = {
  [componentName: string]: Url;
};

export default RouteItem;
