import { useEffect } from "react";
import Navbar from "./elements/navbar";

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
