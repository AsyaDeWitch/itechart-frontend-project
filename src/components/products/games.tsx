import RouteItems from "@/shared/routes/items/routeItems";
import { Redirect, useParams } from "react-router-dom";
import Categories from "@/shared/categories/gameCategories";

type Params = {
  category: string;
};

export default function Games(): JSX.Element {
  const { category } = useParams<Params>();

  return (
    <div>
      <h2>Games page</h2>
      {Categories.findIndex((item) => item.name === category) !== -1 ? (
        <>Page with predefined category {category}</>
      ) : (
        <Redirect to={RouteItems.Products.url} />
      )}
    </div>
  );
}
