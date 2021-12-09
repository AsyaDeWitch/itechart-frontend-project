import Categories from "@/shared/categories/gameCategories";
import { ChangeEventHandler, memo } from "react";
import "./platformSelect.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedPlatformSelect = memo(function PlatformSelect(props: {
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
});

export default MemoizedPlatformSelect;
