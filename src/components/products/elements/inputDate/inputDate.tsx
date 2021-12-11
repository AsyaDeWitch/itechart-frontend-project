import { ChangeEventHandler, FocusEventHandler, memo } from "react";
import "./inputDate.scss";

const MemoizedInputDate = memo(
  (props: {
    onChange: ChangeEventHandler<HTMLInputElement>;
    value: string;
    label: string;
    name: string;
    onBlur: FocusEventHandler;
  }): JSX.Element => (
    <>
      <label htmlFor={`"input-number"${props.label}`} className="labelText">
        {props.label}
      </label>
      <input
        id={`"input-text"${props.label}`}
        className="inputDate"
        type="date"
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        onBlur={props.onBlur}
      />
    </>
  )
);

MemoizedInputDate.displayName = "InputDate";

export default MemoizedInputDate;
