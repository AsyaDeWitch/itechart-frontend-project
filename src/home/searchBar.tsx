import _ from "lodash";
import * as api from "../api/apiProducts";
import "./searchBar.scss";

export default function SearchBar(): JSX.Element {
  return (
    <>
      <input
        onKeyPress={() => _.debounce(() => api.getData(), 300)}
        type="text"
        id="home-search"
        placeholder="Search"
        className="searchBar"
      />
    </>
  );
}
