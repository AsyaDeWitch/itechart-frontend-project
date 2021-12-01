import Categories from "@/shared/categories/gameCategories";
import { ChangeEventHandler } from "react";
import "./platformSelect.scss";

export default function PlatformSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  platforms: number[];
}): JSX.Element {
  return (
    <select id="type-select" className="platform-select" onChange={props.onChange} value={props.value}>
      {props.platforms.map((item: number) => (
        <option className="platform-select__option" key={`${Categories[item - 1].name}`}>
          {Categories[item - 1].name}
        </option>
      ))}
    </select>
  );
}
