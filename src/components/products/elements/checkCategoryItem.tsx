import CategoryItem from "@/shared/categories/categoryItem";
import { useEffect, useState } from "react";
import "./checkCategoryItem.scss";

export default function CheckCategoryItem(props: {
  onCheckedItemsUpdate: (categoryId: number, checked: boolean) => void;
  categoryItem: CategoryItem;
  isChecked: boolean;
}): JSX.Element {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.categoryItem.id, !checked);
  };

  useEffect(() => {
    if (props.isChecked) setChecked(true);
  }, []);

  return (
    <li>
      <label htmlFor={`"input-checkbox"${props.categoryItem.name}`} className="checkbox-label">
        {props.categoryItem.name}
      </label>
      <input
        id={`"input-checkbox"${props.categoryItem.name}`}
        className="category-checkbox"
        type="checkbox"
        defaultChecked={checked}
        onChange={handleCheckboxChange}
      />
    </li>
  );
}
