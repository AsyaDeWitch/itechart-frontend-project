import { useEffect } from "react";
import Navbar from "./navbar";

export default function Header(props: { title: string; userName: string }): JSX.Element {
  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <div>
      <header>
        <Navbar title={props.title} isLoggedIn userName={props.userName} />
      </header>
    </div>
  );
}
