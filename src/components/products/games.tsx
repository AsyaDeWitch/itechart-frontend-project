import RouteItems from "@/shared/routes/items/routeItems";
import { Redirect, useParams } from "react-router-dom";
import Categories from "@/shared/categories/gameCategories";
import "./games.scss";
import { ChangeEvent, lazy, Suspense, useEffect, useState } from "react";
import SearchBar from "@/home/searchBar/searchBar";
import Spinner from "@/home/spinner/spinner";
import useSearchSuspense from "@/hooks/useSearchSuspense";
import SortPanel from "./sortPanel";
import GenresPanel from "./genresPanel";
import AgePanel from "./agePanel";

const ProductsPanel = lazy(async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  return import("./productsPanel");
});

type Params = {
  category: string;
};

export default function Games(): JSX.Element {
  const { category } = useParams<Params>();
  const [sortCriteriaValue, setSortCriteriaValue] = useState("");
  const [sortTypeValue, setSortTypeValue] = useState("");
  const [filterGenreValue, setFilterGenreValue] = useState("");
  const [filterAgeValue, setFilterAgeValue] = useState("");
  const productItems = useSearchSuspense();

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

  const handleSortCriteriaChange = () => {
    //
  };

  const handleSortTypeChange = () => {
    //
  };

  const handleFilterGenreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterGenreValue(event.target.value);
  };
  const handleFilterAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterAgeValue(event.target.value);
  };

  return (
    <div className="games">
      <div className="games__panel">
        <div className="games__category">
          {Categories.findIndex((item) => item.name === category) !== -1 ? (
            <>{category}</>
          ) : (
            <>
              <Redirect to={RouteItems.Products.url} />
              All categories
            </>
          )}
          <hr />
        </div>
        <div className="games__sortPanel">
          <SortPanel
            criteriaValue={sortCriteriaValue}
            typeValue={sortTypeValue}
            OnCriteriaChange={handleSortCriteriaChange}
            OnTypeChange={handleSortTypeChange}
          />
        </div>
        <div className="games__genresPanel">
          <GenresPanel value={filterGenreValue} OnChange={handleFilterGenreChange} />
        </div>
        <div className="games__agePanel">
          <AgePanel value={filterAgeValue} OnChange={handleFilterAgeChange} />
        </div>
      </div>

      <div className="games__table">
        <div className="games__table__searchBar">
          <SearchBar onChange={handleSearchChange} />
        </div>
        <Suspense
          fallback={
            <div className="games__table__spinner">
              <Spinner />
            </div>
          }
        >
          <ProductsPanel productItems={productItems} />
        </Suspense>
      </div>
    </div>
  );
}
