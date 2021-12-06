import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { History, createBrowserHistory } from "history";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
// eslint-disable-next-line no-use-before-define
import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteItems from "./shared/routes/items/routeItems";
import ErrorBoundary from "./shared/errorBoundary";
import ProtectedRoute from "./shared/routes/protectedRoute";
import Home from "./components/home/home";

const Games = React.lazy(() => import("./components/products/games"));
const About = React.lazy(() => import("./components/about/about"));
const Profile = React.lazy(() => import("./components/users/profile"));
const Cart = React.lazy(() => import("./components/cart/cart"));

const title = "Best Games Market";
const history = createBrowserHistory();

interface Props {
  title: string;
  history: History;
}

class AppContainer extends Component<Props> {
  ["constructor"]: typeof AppContainer;

  render() {
    return (
      <ErrorBoundary history={this.props.history}>
        <Router>
          <Header title={this.props.title} />
          <Switch>
            <ProtectedRoute path={`${RouteItems.Products.url}/:category`} component={Games} />
            <ProtectedRoute path={RouteItems.Products.url} component={Games} />
            <ProtectedRoute path={RouteItems.About.url} component={About} />
            <ProtectedRoute path={RouteItems.Profile.url} component={Profile} />
            <ProtectedRoute path={RouteItems.Cart.url} component={Cart} />
            <Route exact path={RouteItems.Home.url} component={Home} />
            <Redirect to={RouteItems.Home.url} />
          </Switch>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <AppContainer title={title} history={history} />
  </Provider>,
  document.getElementById("app")
);
