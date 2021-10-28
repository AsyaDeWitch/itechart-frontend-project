import { Component } from "react";
import Navbar from "./navbar";

interface Props {
  title: string;
}

export default class Header extends Component<Props> {
  constructor(props: { title: string }) {
    super(props);
    document.title = props.title;
  }

  render(): JSX.Element {
    return (
      <div>
        <header>
          <Navbar title={this.props.title} />
        </header>
      </div>
    );
  }
}
