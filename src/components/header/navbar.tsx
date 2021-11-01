import RouteItem from "@/shared/routeItem";
import { PureComponent } from "react";
import { Link } from "react-router-dom";
import RouteItems from "../../shared/routeItems";
import "./header.scss";

interface Props {
  title: string;
}

export default class Navbar extends PureComponent<Props> {
  render(): JSX.Element {
    return (
      <nav className="navbar">
        <h2 className="navbar__title">{this.props.title}</h2>
        <ul className="navbar__menu">
          {RouteItems.map((item: RouteItem) => (
            <li key={item.id}>
              <Link className="navbar__menu__links" to={item.url}>
                {item.componentName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
