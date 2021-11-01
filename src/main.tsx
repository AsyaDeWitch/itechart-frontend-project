import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { History, createBrowserHistory } from "history";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Component } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteMapper from "./shared/routeMapper";
import ErrorBoundary from "./shared/errorBoundary";

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
            <Route path={RouteMapper.About.url} component={RouteMapper.About.component} />
            <Route path={RouteMapper.Products.url} component={RouteMapper.Products.component} />
            <Route exact path={RouteMapper.Home.url} component={RouteMapper.Home.component} />
            <Redirect to={RouteMapper.Home.url} />
          </Switch>
          <Footer />
        </Router>
      </ErrorBoundary>
    );
  }
}

ReactDom.render(<AppContainer title={title} history={history} />, document.getElementById("app"));
