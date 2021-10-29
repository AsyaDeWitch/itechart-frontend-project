import { useEffect, useState } from "react";
import Navbar from "./navbar";

export default function Header(props: { title: string }): JSX.Element {
  useEffect(() => {
    document.title = props.title;
  }, []);
  const [counter, setCounter] = useState(0);

  if (counter === 5) {
    // Simulate a JS error
    throw new Error("I crashed!");
  }
  return (
    <div>
      <h1 onClick={() => setCounter(counter + 1)}>{counter}</h1>
      <header>
        <Navbar title={props.title} />
      </header>
    </div>
  );
}
