import Categories from "@/shared/categories/gameCategories";
import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";

export default function CategoryCard(): JSX.Element {
  return (
    <div>
      <h2>Category</h2>
      {Categories.map((name: string) => (
        <Link key={name} to={RouteItems.Products.url.concat("/".concat(name))}>
          {name}
        </Link>
      ))}
    </div>
  );
}
