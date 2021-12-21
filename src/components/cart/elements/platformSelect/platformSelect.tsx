import { ChangeEventHandler, memo } from "react";
import Categories from "../../../../shared/categories/gameCategories";
import "./platformSelect.scss";

const MemoizedPlatformSelect = memo(
  (props: { onChange: ChangeEventHandler<HTMLSelectElement>; value: string; platforms: number[] }): JSX.Element => (
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
  )
);

MemoizedPlatformSelect.displayName = "PlatformSelect";

export default MemoizedPlatformSelect;
