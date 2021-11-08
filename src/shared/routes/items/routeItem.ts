type Url = {
  url: string;
  id: string;
};

type RouteItem = {
  [componentName: string]: Url;
};

export default RouteItem;
