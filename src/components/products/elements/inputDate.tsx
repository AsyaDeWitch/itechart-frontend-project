import { ChangeEventHandler, FocusEventHandler } from "react";
import "./inputDate.scss";

export default function InputDate(props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
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
        className="inputDate"
        type="date"
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        onBlur={props.onBlur}
      />
    </>
  );
}