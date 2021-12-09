import { ChangeEventHandler, FocusEventHandler, memo } from "react";
import "./textareaProfileDescription.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedTextareaProfileDescription = memo(function TextareaProfileDescription(props: {
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
});

export default MemoizedTextareaProfileDescription;
