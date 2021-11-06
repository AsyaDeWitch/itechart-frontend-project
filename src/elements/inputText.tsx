import { ChangeEventHandler } from "react";
import "./inputText.scss";

export default function InputText(props: {
  onChange: ChangeEventHandler;
  type: string;
  placeholder: string;
  label: string;
}): JSX.Element {
  return (
    <label htmlFor="input-text" className="labelText">
      {props.label}
      <input
        onChange={props.onChange}
        type={props.type}
        id="input-text"
        placeholder={props.placeholder}
        className="inputText"
      />
    </label>
  );
}
