import "./searchBar.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SearchBar(props: { onKeyUp: any }): JSX.Element {
  return (
    <>
      <input onKeyUp={props.onKeyUp} type="text" id="home-search" placeholder="Search" className="searchBar" />
    </>
  );
}
