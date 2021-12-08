import { MouseEventHandler } from "react";
import imgClose from "images/header/close.png";
import "./buttonClose.scss";

export default function ButtonClose(props: { onClick: MouseEventHandler }): JSX.Element {
  return (
    <button type="button" className="buttonClose" onClick={props.onClick}>
      <img src={imgClose} alt="close" className="buttonClose__icon" />
    </button>
  );
}
