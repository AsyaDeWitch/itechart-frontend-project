import CategoryItem from "@/shared/categories/categoryItem";
import { useState } from "react";

export default function CheckCategoryItem(props: {
  onCheckedItemsUpdate: (categoryId: number, checked: boolean) => void;
  categoryItem: CategoryItem;
}): JSX.Element {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.categoryItem.id, !checked);
  };

  // label for input
  return <input className="" type="checkbox" defaultChecked={checked} onChange={handleCheckboxChange} />;
}
