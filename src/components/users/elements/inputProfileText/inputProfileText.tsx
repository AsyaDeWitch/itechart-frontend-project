import { ChangeEventHandler, FocusEventHandler, memo } from "react";
import "./inputProfileText.scss";

const MemoizedInputProfileText = memo(
  (props: {
    onChange: ChangeEventHandler;
    type: string;
    placeholder: string;
    label: string;
    name: string;
    value: string | number;
    onBlur: FocusEventHandler;
  }): JSX.Element => (
    <>
      <label htmlFor={`"input-text"${props.label}`} className="labelProfileText">
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={`"input-text"${props.label}`}
        placeholder={props.placeholder}
        className="inputProfileText"
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
      />
    </>
  )
);

MemoizedInputProfileText.displayName = "InputProfileText";

export default MemoizedInputProfileText;
