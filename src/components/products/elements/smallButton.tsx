import { MouseEventHandler } from "react";
import "./smallButton.scss";

export default function SmallButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="smallButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
