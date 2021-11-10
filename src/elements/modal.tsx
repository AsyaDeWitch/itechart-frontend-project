import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal(props: { children: JSX.Element }): JSX.Element {
  const modalRoot = document.getElementById("modal-container");
  const element = document.createElement(typeof Fragment);

  useEffect(() => {
    modalRoot?.appendChild(element);
    return () => {
      modalRoot?.removeChild(element);
    };
  }, []);

  return ReactDOM.createPortal(props.children, element);
}
