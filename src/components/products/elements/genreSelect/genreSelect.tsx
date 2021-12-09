import Genres from "@/mockData/genres.json";
import { ChangeEventHandler, memo } from "react";
import "./genreSelect.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedGenreSelect = memo(function GenreSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label: string;
}): JSX.Element {
  return (
    <>
      <label className="labelText" htmlFor="genre-select">
        {props.label}
      </label>
      <select id="genre-select" className="genre-select" onChange={props.onChange} value={props.value}>
        {Genres.map((item) => (
          <option className="genre-select__option" key={`${item.description}`}>
            {item.description}
          </option>
        ))}
      </select>
    </>
  );
});

export default MemoizedGenreSelect;
