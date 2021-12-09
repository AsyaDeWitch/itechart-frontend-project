import { ChangeEventHandler, FocusEventHandler, memo } from "react";
import "./descriptionTextArea.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedDescriptionTextArea = memo(function DescriptionTextArea(props: {
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
});

export default MemoizedDescriptionTextArea;
