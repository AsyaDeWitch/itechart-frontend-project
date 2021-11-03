import { useEffect, useState } from "react";
import "./spinner.scss";

export default function Spinner(props: { delay: number }): JSX.Element {
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsShown(true), props.delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return <>{isShown ? <div className="spinner" /> : null}</>;
}
