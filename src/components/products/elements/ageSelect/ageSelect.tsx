import { ChangeEventHandler } from "react";
import Ages from "@/mockData/ages.json";
import "./ageSelect.scss";

export default function AgeSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label: string;
}): JSX.Element {
  return (
    <>
      <label className="labelText" htmlFor="age-select">
        {props.label}
      </label>
      <select id="age-select" className="age-select" onChange={props.onChange} value={props.value}>
        {Ages.map((item) => (
          <option className="age-select__option" key={`${item.name}`}>
            {item.name}
          </option>
        ))}
      </select>
    </>
  );
}
