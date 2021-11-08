import { MouseEventHandler } from "react";
import "./buttonSubmit.scss";

export default function ButtonSubmit(props: { onClick: MouseEventHandler<HTMLButtonElement> }): JSX.Element {
  return (
    <button type="submit" className="buttonSubmit" onClick={props.onClick}>
      Submit
    </button>
  );
}
