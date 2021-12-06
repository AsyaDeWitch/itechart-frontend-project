import { MouseEventHandler } from "react";

export default function ProductModalButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="buttonSubmit" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
