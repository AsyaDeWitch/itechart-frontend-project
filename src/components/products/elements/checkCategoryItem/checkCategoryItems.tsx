import CategoryItem from "@/shared/categories/categoryItem";
import Categories from "@/shared/categories/gameCategories";
import { memo } from "react";
import CheckCategoryItem from "./checkCategoryItem";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedCheckCategoryItems = memo(function CheckCategoryItems(props: {
  onCheckedItemsUpdate: (categoryId: number, checked: boolean) => void;
  label: string;
  checkedPlatforms: number[];
}): JSX.Element {
  return (
    <>
      <label htmlFor={`"checkboxes"${props.label}`} className="labelText">
        {props.label}
      </label>
      <div className="modal__checkboxes" id={`"checkboxes"${props.label}`}>
        {Categories.map((category: CategoryItem) => (
          <ul className="modal__checkboxes__list" key={category.name}>
            <CheckCategoryItem
              onCheckedItemsUpdate={props.onCheckedItemsUpdate}
              categoryItem={category}
              isChecked={props.checkedPlatforms.some((platform) => platform === category.id)}
            />
          </ul>
        ))}
      </div>
    </>
  );
});

export default MemoizedCheckCategoryItems;
