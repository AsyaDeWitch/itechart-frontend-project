import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { History, createBrowserHistory } from "history";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Component } from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteItems from "./shared/routes/items/routeItems";
import ErrorBoundary from "./shared/errorBoundary";
import Games from "./components/products/games";
import About from "./components/about/about";
import Home from "./home/home";
import Profile from "./components/users/profile";
import Cart from "./components/cart/cart";
import ProtectedRoute from "./shared/routes/protectedRoute";

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
