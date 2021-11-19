import RouteItems from "@/shared/routes/items/routeItems";
import { Redirect, useParams } from "react-router-dom";
import Categories from "@/shared/categories/gameCategories";
import "./games.scss";
import { ChangeEvent, useEffect } from "react";
import SearchBar from "@/home/searchBar/searchBar";

type Params = {
  category: string;
};

export default function Games(): JSX.Element {
  const { category } = useParams<Params>();

  useEffect(() => {
    // declare state for category
    if (Categories.findIndex((item) => item.name === category) !== -1) {
      // do call with predefined category
    } else {
      // do call for all categories
    }
  }, []);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // this.setState({ isLoading: true });
    // smth with suspense/hook
  };

  return (
    <div className="games">
      <h2>Games page</h2>
      {Categories.findIndex((item) => item.name === category) !== -1 ? (
        <>Page with predefined category {category}</>
      ) : (
        <Redirect to={RouteItems.Products.url} />
      )}
      <div className="products__searchBar">
        <SearchBar onChange={handleSearchChange} />
      </div>
    </div>
  );
}
