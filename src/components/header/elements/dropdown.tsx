import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";
import "./dropdown.scss";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";
import { memo } from "react";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedDropdown = memo(function Dropdown(): JSX.Element {
  return (
    <div className="dropdown__content">
      {Categories.map((item: CategoryItem) => (
        <Link key={item.name} className="dropdown__content__link" to={`${RouteItems.Products.url}/${item.name}`}>
          {item.name}
        </Link>
      ))}
    </div>
  );
});

export default MemoizedDropdown;
