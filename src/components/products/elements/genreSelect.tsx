import Genres from "@/mockData/genres.json";
import { ChangeEventHandler } from "react";

export default function GenreSelect(props: {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: string;
  label: string;
}): JSX.Element {
  return (
    <div className="">
      <label className="" htmlFor="genre-select">
        {props.label}
        <select id="genre-select" className="" onChange={props.onChange} value={props.value}>
          {Genres.map((item) => (
            <option className="" key={`${item.description}`}>
              {item.description}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
