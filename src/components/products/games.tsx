import RouteItems from "@/shared/routes/items/routeItems";
import { Redirect, useParams } from "react-router-dom";
import Categories from "@/shared/categories/gameCategories";
import "./games.scss";
import { ChangeEvent, useEffect, useState } from "react";
import SearchBar from "@/home/searchBar/searchBar";
import SortPanel from "./sortPanel";

type Params = {
  category: string;
};

export default function Games(): JSX.Element {
  const { category } = useParams<Params>();
  const [sortCriteriaValue, setSortCriteriaValue] = useState("");

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

  return (
    <div className="games">
      <div className="games__panel">
        <div>
          {Categories.findIndex((item) => item.name === category) !== -1 ? (
            <>{category}</>
          ) : (
            <>
              <Redirect to={RouteItems.Products.url} />
              All categories
            </>
          )}
          <hr />
          <div>
            <SortPanel value={sortCriteriaValue} OnChange={handleSortCriteriaChange} />
          </div>
          <div>
            <label htmlFor="type">Type: </label>
            <select id="type">
              <option>Ascending</option>
              <option>Descending</option>
            </select>
          </div>
        </div>
        Genres
        <hr />
        <div>
          <div>
            <input type="radio" id="all_genres" checked />
            <label htmlFor="all_genres">All genres</label>
          </div>
          <div>
            <input type="radio" id="Sandbox" />
            <label htmlFor="Sandbox">Sandbox</label>
          </div>
          <div>
            <input type="radio" id="Real-time strategy" />
            <label htmlFor="Real-time strategy">Real-time strategy</label>
          </div>
          <div>
            <input type="radio" id="Shooter" />
            <label htmlFor="Shooter">Shooter</label>
          </div>
          <div>
            <input type="radio" id="Moba" />
            <label htmlFor="Moba">Multiplayer</label>
          </div>
          <div>
            <input type="radio" id="Role-playing" />
            <label htmlFor="Role-playing">Role-playing</label>
          </div>
          <div>
            <input type="radio" id="Simulation" />
            <label htmlFor="Simulation">Simulation</label>
          </div>
          <div>
            <input type="radio" id="Sports" />
            <label htmlFor="Sports">Sports</label>
          </div>
          <div>
            <input type="radio" id="Puzzler" />
            <label htmlFor="Puzzler">Puzzler</label>
          </div>
          <div>
            <input type="radio" id="Action-adventure" />
            <label htmlFor="Action-adventure">Action-adventure</label>
          </div>
          <div>
            <input type="radio" id="Survival" />
            <label htmlFor="Survival">Survival</label>
          </div>
          <div>
            <input type="radio" id="Horror" />
            <label htmlFor="Horror">Horror</label>
          </div>
          <div>
            <input type="radio" id="Turn-based strategy" />
            <label htmlFor="Turn-based strategy">Turn-based strategy</label>
          </div>
        </div>
        Age
        <hr />
        <div>
          <div>
            <input type="radio" id="all_ages" checked />
            <label htmlFor="all_ages">All ages</label>
          </div>
          <div>
            <input type="radio" id="G (3+)" />
            <label htmlFor="G (3+)">G (3+)</label>
          </div>
          <div>
            <input type="radio" id="PG (6+)" />
            <label htmlFor="PG (6+)">PG (6+)</label>
          </div>
          <div>
            <input type="radio" id="PG-13 (12+)" />
            <label htmlFor="PG-13 (12+)">PG-13 (12+)</label>
          </div>
          <div>
            <input type="radio" id="R (17+)" />
            <label htmlFor="R (17+)">R (17+)</label>
          </div>
          <div>
            <input type="radio" id="NC-17 (18+)" />
            <label htmlFor="NC-17 (18+)">NC-17 (18+)</label>
          </div>
        </div>
      </div>

      <div className="games__table">
        <div className="games__table__searchBar">
          <SearchBar onChange={handleSearchChange} />
        </div>
        <div className="games__table__products">
          Products
          <hr />
          {/* Games */}
        </div>
      </div>
    </div>
  );
}
