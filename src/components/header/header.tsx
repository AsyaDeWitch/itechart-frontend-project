import { useEffect } from "react";
import Navbar from "./navbar";

export default function Header(props: { title: string }): JSX.Element {
  useEffect(() => {
    document.title = props.title;
  }, []);
  return (
    <div>
      <header>
        <Navbar title={props.title} />
      </header>
    </div>
  );
}
