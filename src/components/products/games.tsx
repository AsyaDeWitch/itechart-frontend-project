import { useSelector } from "react-redux";
import debounce from "lodash/debounce";
import { ChangeEvent, useState, useCallback } from "react";
import { Redirect, useParams } from "react-router-dom";
import RouteItems from "@/shared/routes/items/routeItems";
import Categories from "@/shared/categories/gameCategories";
import "./games.scss";
import SearchBar from "@/components/home/elements/searchBar/searchBar";
import useSearchSuspense from "@/hooks/useSearchSuspense";
import { TStore } from "@/redux/store";
import Modal from "@/elements/modal";
import SortPanel from "./panels/sortPanel/sortPanel";
import GenresPanel from "./panels/filterPanel/genresPanel";
import AgePanel from "./panels/filterPanel/agePanel";
import CreateCardButton from "./elements/createCardButton/createCardButton";
import ProductModal from "./modals/productModal";

type Params = {
  category: string;
};

export default function Games(): JSX.Element {
  const { category } = useParams<Params>();
  const [sortCriteriaValue, setSortCriteriaValue] = useState("Rating");
  const [sortTypeValue, setSortTypeValue] = useState("Ascending");
  const [filterGenreValue, setFilterGenreValue] = useState("");
  const [filterAgeValue, setFilterAgeValue] = useState("");
  const [searchName, setSearchName] = useState("");
  const [isShownAddCard, setIsShownAddCard] = useState(false);
  const { isNeedToUpdate } = useSelector((state: TStore) => state.reducer.productsReducer);
  const productItems = useSearchSuspense(
    sortCriteriaValue,
    sortTypeValue,
    filterGenreValue,
    filterAgeValue,
    searchName,
    category,
    isNeedToUpdate
  );
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const handleDebouncedSearchChange = debounce((event) => {
    setSearchName(event.target.value);
  }, 500);

  const memoizedSearchChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    handleDebouncedSearchChange(event);
  }, []);

  const memoizedSortCriteriaChangeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSortCriteriaValue(event.target.value);
    },
    [sortCriteriaValue]
  );

  const memoizedSortTypeChangeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setSortTypeValue(event.target.value);
    },
    [sortTypeValue]
  );

  const memoizedFilterGenreChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterGenreValue(event.target.value);
    },
    [filterGenreValue]
  );
  const memoizedFilterAgeChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setFilterAgeValue(event.target.value);
    },
    [filterAgeValue]
  );

  const memoizedCreateCardButtonClickHandler = useCallback(() => {
    setIsShownAddCard(true);
  }, []);

  const memoizedAddButtonCloseClickHandler = useCallback(() => {
    setIsShownAddCard(false);
  }, []);

  return (
    <>
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
              OnCriteriaChange={memoizedSortCriteriaChangeHandler}
              OnTypeChange={memoizedSortTypeChangeHandler}
            />
          </div>
          <div className="games__genresPanel">
            <GenresPanel value={filterGenreValue} OnChange={memoizedFilterGenreChangeHandler} />
          </div>
          <div className="games__agePanel">
            <AgePanel value={filterAgeValue} OnChange={memoizedFilterAgeChangeHandler} />
          </div>
        </div>

        <div className="games__table">
          <div className="games__table__searchBar">
            <SearchBar onChange={memoizedSearchChangeHandler} />
            {signInUser.role === "admin" ? (
              <CreateCardButton onClick={memoizedCreateCardButtonClickHandler} buttonText="Create card" />
            ) : null}
          </div>
          {productItems}
        </div>
      </div>
      {isShownAddCard ? (
        <Modal>
          <ProductModal oldProduct={null} onButtonCloseClick={memoizedAddButtonCloseClickHandler} />
        </Modal>
      ) : null}
    </>
  );
}
