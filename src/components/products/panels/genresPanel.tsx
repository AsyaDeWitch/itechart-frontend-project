import Genres from "@/mockData/genres.json";
import GenreItem from "@/shared/games/genreItem";
import { ChangeEventHandler } from "react";
import "./filterPanel.scss";

export default function GenresPanel(props: {
  value: string;
  OnChange: ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  return (
    <>
      Genres
      <hr />
      <div className="filterPanel">
        <div>
          <label htmlFor="all genres">
            <input type="radio" id="all genres" value="" checked={props.value === ""} onChange={props.OnChange} /> All
            genres
          </label>
        </div>
        {Genres.map((item: GenreItem) => (
          <div key={item.id}>
            <label htmlFor={item.name}>
              <input
                type="radio"
                id={item.name}
                value={item.name}
                checked={props.value === item.name}
                onChange={props.OnChange}
              />{" "}
              {item.description}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}