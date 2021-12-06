import { ChangeEventHandler } from "react";
import "./searchBar.scss";

export default function SearchBar(props: { onChange: ChangeEventHandler }): JSX.Element {
  return (
    <>
      <input onChange={props.onChange} type="text" id="home-search" placeholder="Search" className="searchBar" />
    </>
  );
}
