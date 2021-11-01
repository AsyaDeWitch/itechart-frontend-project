import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import ReactDom from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { ErrorInfo, PureComponent } from "react";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteMapper from "./shared/routeMapper";

const Title = "Best Games Market";

interface Props {
  title: string;
}

class AppContainer extends PureComponent<Props> {
  ["constructor"]: typeof AppContainer;

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    alert("Something went wrong...");
    window.location.href = RouteMapper.Home.url;
  }

  render() {
    return (
      <Router>
        <Header title={this.props.title} />
        <Switch>
          <Route exact path={RouteMapper.About.url} component={RouteMapper.About.component} />
          <Route exact path={RouteMapper.Products.url} component={RouteMapper.Products.component} />
          <Route exact path={RouteMapper.Home.url} component={RouteMapper.Home.component} />
          <Route>
            <Redirect to={RouteMapper.Home.url} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );
  }
}

ReactDom.render(<AppContainer title={Title} />, document.getElementById("app"));
