import { MouseEventHandler } from "react";

export default function ButtonClose(props: { onClick: MouseEventHandler }): JSX.Element {
  return (
    <button type="button" className="buttonClose" onClick={props.onClick}>
      <p />
    </button>
  );
}
