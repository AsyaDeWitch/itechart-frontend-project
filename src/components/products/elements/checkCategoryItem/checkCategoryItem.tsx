import { memo, useCallback, useEffect, useState } from "react";
import CategoryItem from "@/shared/categories/categoryItem";
import "./checkCategoryItem.scss";

const MemoizedCheckCategoryItem = memo(
  (props: {
    onCheckedItemsUpdate: (categoryId: number, checked: boolean) => void;
    categoryItem: CategoryItem;
    isChecked: boolean;
  }): JSX.Element => {
    const [checked, setChecked] = useState(props.isChecked);

    const memoizedCheckboxChangeHandler = useCallback(() => {
      setChecked(!checked);
      props.onCheckedItemsUpdate(props.categoryItem.id, !checked);
    }, [checked, props.categoryItem, props.onCheckedItemsUpdate]);

    useEffect(() => {
      if (props.isChecked) {
        setChecked(true);
      }
    }, [props.isChecked]);

    return (
      <li>
        <label htmlFor={`"input-checkbox"${props.categoryItem.name}`} className="checkbox-label">
          {props.categoryItem.name}
        </label>
        <input
          id={`"input-checkbox"${props.categoryItem.name}`}
          className="category-checkbox"
          type="checkbox"
          checked={checked}
          onChange={memoizedCheckboxChangeHandler}
        />
      </li>
    );
  }
);

MemoizedCheckCategoryItem.displayName = "CheckCategoryItem";

export default MemoizedCheckCategoryItem;
