import CategoryItem from "@/shared/categories/categoryItem";
import Categories from "@/shared/categories/gameCategories";
import { ChangeEventHandler } from "react";
import "./platformSelect.scss";

export default function PlatformSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
}): JSX.Element {
  return (
    <select id="type-select" className="platform-select" onChange={props.onChange} value={props.value}>
      {Categories.map((item: CategoryItem) => (
        <option className="platform-select__option" key={`${item.name}`}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
