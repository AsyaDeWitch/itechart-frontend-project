class RouteItem {
  id: string;

  title: string;

  url: string;

  className: string;

  constructor(id: string, title: string, url: string, className: string) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.className = className;
  }
}

export default RouteItem;
