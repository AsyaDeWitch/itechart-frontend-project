import { ChangeEventHandler, memo } from "react";
import "./searchBar.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedSearchBar = memo(function SearchBar(props: { onChange: ChangeEventHandler }): JSX.Element {
  return (
    <>
      <input onChange={props.onChange} type="text" id="home-search" placeholder="Search" className="searchBar" />
    </>
  );
});
export default MemoizedSearchBar;
