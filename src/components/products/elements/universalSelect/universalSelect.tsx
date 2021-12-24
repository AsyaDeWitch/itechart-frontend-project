import { ChangeEventHandler, memo } from "react";
import "./universalSelect.scss";

const MemoizedAgeSelect = memo(
  (props: {
    onChange: ChangeEventHandler<HTMLSelectElement>;
    value: string;
    label: string;
    selectOptions: string[];
  }): JSX.Element => (
    <>
      <label className="labelText" htmlFor="universal-select">
        {props.label}
      </label>
      <select id="universal-select" className="universal-select" onChange={props.onChange} value={props.value}>
        {props.selectOptions.map((item) => (
          <option className="universal-select__option" key={`${item}`}>
            {item}
          </option>
        ))}
      </select>
    </>
  )
);

MemoizedAgeSelect.displayName = "UniversalSelect";

export default MemoizedAgeSelect;
