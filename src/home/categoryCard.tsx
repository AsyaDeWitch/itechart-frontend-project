import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";

export default function CategoryCard(props: { categoryName: string }): JSX.Element {
  return (
    <div>
      <h2>Category</h2>
      <Link to={RouteItems.Products.url.concat("/".concat(props.categoryName))}>{props.categoryName}</Link>
    </div>
  );
}
