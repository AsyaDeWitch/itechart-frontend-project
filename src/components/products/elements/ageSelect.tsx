import { ChangeEventHandler } from "react";
import Ages from "@/mockData/ages.json";

export default function AgeSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label: string;
}): JSX.Element {
  return (
    <div className="">
      <label className="" htmlFor="age-select">
        {props.label}
        <select id="age-select" className="" onChange={props.onChange} value={props.value}>
          {Ages.map((item) => (
            <option className="" key={`${item.name}`}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
