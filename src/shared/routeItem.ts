class RouteItem {
  id: string;

  componentName: string;

  url: string;

  constructor(id: string, componentName: string, url: string) {
    this.id = id;
    this.componentName = componentName;
    this.url = url;
  }
}

export default RouteItem;
