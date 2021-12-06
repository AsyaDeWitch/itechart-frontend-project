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
        <option
          className="platform-select__option"
          key={`${(Categories.find((category) => category.id === item) || Categories[0]).name}`}
        >
          {(Categories.find((category) => category.id === item) || Categories[0]).name}
        </option>
      ))}
    </select>
  );
}
