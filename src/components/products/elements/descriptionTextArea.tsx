import { ChangeEventHandler, FocusEventHandler } from "react";
import "./descriptionTextArea.scss";

export default function DescriptionTextArea(props: {
  onChange: ChangeEventHandler;
  placeholder: string;
  label: string;
  name: string;
  value: string;
  onBlur: FocusEventHandler;
}): JSX.Element {
  return (
    <>
      <label htmlFor={`"input-text"${props.label}`} className="labelDescription">
        {props.label}
      </label>
      <textarea
        onChange={props.onChange}
        id={`"input-text"${props.label}`}
        placeholder={props.placeholder}
        className="descriptionTextarea"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
}
