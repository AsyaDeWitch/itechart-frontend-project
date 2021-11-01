import { ErrorInfo, Component, ReactNode } from "react";
import { History } from "history";
import RouteMapper from "./routeMapper";

interface Props {
  history: History;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error:", error, errorInfo);
    alert("Something went wrong...");
  }

  render(): ReactNode {
    if (this.state.hasError) {
      this.props.history.push(RouteMapper.Home.url);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
