import { MouseEventHandler } from "react";
import "./createCardButton.scss";

export default function CreateProductButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="createCardButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
