import { ChangeEventHandler } from "react";
import "./inputText.scss";

export default function InputText(props: {
  onChange: ChangeEventHandler;
  type: string;
  placeholder: string;
  label: string;
  name: string;
  value: string;
}): JSX.Element {
  return (
    <>
      <label htmlFor={"input-text".concat(props.label)} className="labelText">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={"input-text".concat(props.label)}
        placeholder={props.placeholder}
        className="inputText"
        name={props.name}
        value={props.value}
      />
    </>
  );
}
