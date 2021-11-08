import { useEffect } from "react";
import { History } from "history";
import Navbar from "./navbar";

export default function Header(props: { title: string; history: History }): JSX.Element {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <header>
        <Navbar title={props.title} isLoggedIn userName="User" history={props.history} />
      </header>
    </div>
  );
}
