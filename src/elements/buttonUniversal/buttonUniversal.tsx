import { MouseEventHandler } from "react";
import "./buttonUniversal.scss";

export default function ButtonUniversal(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="buttonUniversal" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
