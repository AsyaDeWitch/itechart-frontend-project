import RouteItems from "@/shared/routes/items/routeItems";
import { Redirect, useParams } from "react-router-dom";
import Categories from "@/shared/categories/gameCategories";
import "./games.scss";
import { ChangeEvent, useState, MouseEvent } from "react";
import SearchBar from "@/components/home/elements/searchBar";
import useSearchSuspense from "@/hooks/useSearchSuspense";
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { TStore } from "@/redux/store";
import Modal from "@/elements/modal";
import SortPanel from "./panels/sortPanel";
import GenresPanel from "./panels/genresPanel";
import AgePanel from "./panels/agePanel";
import CreateCardButton from "./elements/createCardButton";
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

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    handleDebouncedSearchChange(event);
  };

  const handleSortCriteriaChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortCriteriaValue(event.target.value);
  };

  const handleSortTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortTypeValue(event.target.value);
  };

  const handleFilterGenreChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterGenreValue(event.target.value);
  };
  const handleFilterAgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterAgeValue(event.target.value);
  };

  const handleCreateCarduttonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setIsShownAddCard(true);
    console.log(event);
  };

  const handleAddButtonCloseClick = () => {
    setIsShownAddCard(false);
  };

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
            {signInUser.role === "admin" ? (
              <CreateCardButton onClick={handleCreateCarduttonClick} buttonText="Create card" />
            ) : null}
          </div>
          {productItems}
        </div>
      </div>
      {isShownAddCard ? (
        <Modal>
          <ProductModal oldProduct={null} onButtonCloseClick={handleAddButtonCloseClick} />
        </Modal>
      ) : null}
    </>
  );
}
