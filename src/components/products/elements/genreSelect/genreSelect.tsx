import Genres from "@/mockData/genres.json";
import { ChangeEventHandler, memo } from "react";
import "./genreSelect.scss";

const MemoizedGenreSelect = memo(
  (props: { onChange: ChangeEventHandler<HTMLSelectElement>; value: string; label: string }): JSX.Element => (
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
  )
);

MemoizedGenreSelect.displayName = "GenreSelect";

export default MemoizedGenreSelect;
