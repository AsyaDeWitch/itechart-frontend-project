import { Link } from "react-router-dom";
import { memo } from "react";
import RouteItems from "@/shared/routes/items/routeItems";
import "./dropdown.scss";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";

const MemoizedDropdown = memo(
  (): JSX.Element => (
    <div className="dropdown__content">
      {Categories.map((item: CategoryItem) => (
        <Link key={item.name} className="dropdown__content__link" to={`${RouteItems.Products.url}/${item.name}`}>
          {item.name}
        </Link>
      ))}
    </div>
  )
);

MemoizedDropdown.displayName = "Dropdown";

export default MemoizedDropdown;
