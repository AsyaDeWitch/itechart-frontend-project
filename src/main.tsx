import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component } from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer";
import RouteMapper from "./shared/routeMapper";

const Title = "Best Games Market";

interface Props {
  title: string;
}

class AppContainer extends Component<Props> {
  ["constructor"]: typeof AppContainer;

  constructor(props: Props) {
    super(props);
    // test class-dead-code
    const goExlcude = true;
    if (!goExlcude) {
      console.warn("class-dead-code doesn't work");
    }
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
