import { ChangeEventHandler, FocusEventHandler } from "react";
import "./textareaProfileDescription.scss";

export default function TextareaProfileDescription(props: {
  onChange: ChangeEventHandler;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onBlur: FocusEventHandler;
}): JSX.Element {
  return (
    <>
      <label htmlFor={`"input-text"${props.label}`} className="labelProfileDescription">
        {props.label}
      </label>
      <textarea
        onChange={props.onChange}
        id={`"input-text"${props.label}`}
        placeholder={props.placeholder}
        className="textareaProfileDescription"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
}
