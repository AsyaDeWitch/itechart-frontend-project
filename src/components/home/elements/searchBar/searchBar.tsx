import { ChangeEventHandler, memo } from "react";
import "./searchBar.scss";

const MemoizedSearchBar = memo(
  (props: { onChange: ChangeEventHandler }): JSX.Element => (
    <>
      <input onChange={props.onChange} type="text" id="home-search" placeholder="Search" className="searchBar" />
    </>
  )
);

MemoizedSearchBar.displayName = "SearchBar";

export default MemoizedSearchBar;
