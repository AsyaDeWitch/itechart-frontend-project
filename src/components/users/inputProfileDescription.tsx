import { ChangeEventHandler, FocusEventHandler } from "react";
import "./inputProfileDescription.scss";

export default function InputProfileDescription(props: {
  onChange: ChangeEventHandler;
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onBlur: FocusEventHandler;
}): JSX.Element {
  return (
    <>
      <label htmlFor={"input-text".concat(props.label)} className="labelProfileDescription">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={"input-text".concat(props.label)}
        placeholder={props.placeholder}
        className="inputProfileDescription"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
}
