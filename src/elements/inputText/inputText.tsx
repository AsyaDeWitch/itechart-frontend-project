import { ChangeEventHandler, FocusEventHandler, memo } from "react";
import "./inputText.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedInputText = memo(function InputText(props: {
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
      <label htmlFor={`"input-text"${props.label}`} className="labelText">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={`"input-text"${props.label}`}
        placeholder={props.placeholder}
        className="inputText"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  );
});

export default MemoizedInputText;
