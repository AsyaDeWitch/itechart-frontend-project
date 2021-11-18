import { ChangeEventHandler, FocusEventHandler } from "react";
import "./inputProfileText.scss";

export default function InputProfileText(props: {
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
      <label htmlFor={"input-text".concat(props.label)} className="labelProfileText">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={"input-text".concat(props.label)}
        placeholder={props.placeholder}
        className="inputProfileText"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
}
