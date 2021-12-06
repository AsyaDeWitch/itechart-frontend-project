import { ChangeEventHandler, FocusEventHandler } from "react";
import "./inputNumberText.scss";

export default function InputNumberText(props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
  label: string;
  name: string;
  onBlur: FocusEventHandler;
}): JSX.Element {
  return (
    <>
      <label htmlFor={`"input-number"${props.label}`} className="labelText">
        {props.label}
      </label>
      <input
        id={`"input-text"${props.label}`}
        className="inputNumberText"
        type="number"
        min="0"
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        onBlur={props.onBlur}
      />
    </>
  );
}