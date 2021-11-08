import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";
import "./dropdown.scss";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";

export default function Dropdown(): JSX.Element {
  return (
    <>
      {Categories.map((item: CategoryItem) => (
        <Link key={item.name} className="dropdown__content" to={RouteItems.Products.url.concat("/".concat(item.name))}>
          {item.name}
        </Link>
      ))}
    </>
  );
}
