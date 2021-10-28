import RouteItem from "@/shared/routeItem";
import { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouteItems from "../../shared/routeItems";
import "./header.scss";

interface Props {
  title: string;
}

export default class Navbar extends Component<Props> {
  render(): JSX.Element {
    return (
      <Router>
        <nav className="navbar">
          <h2 className="navbar__title">{this.props.title}</h2>
          <ul className="navbar__menu">
            {RouteItems.map((item: RouteItem) => (
              <li key={item.id}>
                <a className={item.className} href={item.url}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Router>
    );
  }
}
