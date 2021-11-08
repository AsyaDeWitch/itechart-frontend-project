import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { History, createBrowserHistory } from "history";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteItems from "./shared/routes/items/routeItems";
import ErrorBoundary from "./shared/errorBoundary";
import Games from "./components/products/games";
import About from "./components/info/about";
import Home from "./home/home";
import Profile from "./components/users/profile";
import Cart from "./components/cart/cart";

const title = "Best Games Market";
const history = createBrowserHistory();

interface Props {
  title: string;
  history: History;
}

interface State {
  userName: string;
}

class AppContainer extends Component<Props, State> {
  ["constructor"]: typeof AppContainer;

  constructor(props: Props) {
    super(props);
    this.state = { userName: "User" };
  }

  handleSignIn = () => {
    /* configuration */
  };

  handleSignOut = () => {
    /* configuration */
  };

  render() {
    return (
      <ErrorBoundary history={this.props.history}>
        <Router>
          <Header title={this.props.title} userName={this.state.userName} />
          <Switch>
            {/* only for logged in user*/}
            <Route path={`${RouteItems.Products.url}/:category`}>
              <Games />
            </Route>
            {/* only for logged in user*/}
            <Route path={RouteItems.Products.url}>
              <Games />
            </Route>
            {/* only for logged in user*/}
            <Route path={RouteItems.About.url}>
              <About />
            </Route>
            {/* only for logged in user*/}
            <Route path={RouteItems.Profile.url}>
              <Profile />
            </Route>
            {/* only for logged in user*/}
            <Route path={RouteItems.Cart.url}>
              <Cart />
            </Route>
            <Route exact path={RouteItems.Home.url}>
              <Home />
            </Route>
            <Redirect to={RouteItems.Home.url} />
          </Switch>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(<AppContainer title={title} history={history} />, document.getElementById("app"));
