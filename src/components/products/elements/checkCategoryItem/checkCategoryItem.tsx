import CategoryItem from "@/shared/categories/categoryItem";
import { memo, useEffect, useState } from "react";
import "./checkCategoryItem.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedCheckCategoryItem = memo(function CheckCategoryItem(props: {
  onCheckedItemsUpdate: (categoryId: number, checked: boolean) => void;
  categoryItem: CategoryItem;
  isChecked: boolean;
}): JSX.Element {
  const [checked, setChecked] = useState(props.isChecked);
  //
  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.categoryItem.id, !checked);
  };

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
        onChange={handleCheckboxChange}
      />
    </li>
  );
});

export default MemoizedCheckCategoryItem;
