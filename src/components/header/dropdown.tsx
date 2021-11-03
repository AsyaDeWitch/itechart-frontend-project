import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";
import "./dropdown.scss";
import Categories from "@/shared/categories/gameCategories";

export default function Dropdown(): JSX.Element {
  return (
    <>
      {Categories.map((name: string) => (
        <Link key={name} className="dropdown__content" to={RouteItems.Products.url.concat("/".concat(name))}>
          {name}
        </Link>
      ))}
    </>
  );
}
