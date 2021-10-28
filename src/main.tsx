import "./styles/main.scss";
// watch: native intellisense and file-peek for aliases from jsconfig.json and with none-js files doesn't work: https://github.com/microsoft/TypeScript/issues/29334
import { Component, StrictMode } from "react";
import ReactDom from "react-dom";
import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import Home from "@/components/info/home";
import About from "@/components/info/about";
import Games from "@/components/products/games";
import RouteItems from "./shared/routeItems";
import Header from "./components/header/header";
import Footer from "./components/footer";

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
      <StrictMode>
        <Router>
          <Header title={this.props.title} />
          <Switch>
            <Route exact path={RouteItems[1].url}>
              <Games />
            </Route>
            <Route exact path={RouteItems[2].url}>
              <About />
            </Route>
            <Route exact path={RouteItems[0].url}>
              <Home />
            </Route>
            <Route>
              <Redirect to={RouteItems[0].url} />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </StrictMode>
    );
  }
}

ReactDom.render(<AppContainer title={Title} />, document.getElementById("app"));
