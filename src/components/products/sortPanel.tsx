import { ChangeEventHandler } from "react";
import Criterias from "@/mockData/criterias.json";
import CriteriaItem from "@/shared/games/criteriaItem";
import "./sortPanel.scss";

export default function SortPanel(props: {
  value: string;
  OnChange: ChangeEventHandler<HTMLSelectElement>;
}): JSX.Element {
  return (
    <>
      Sort
      <hr />
      <div>
        <label htmlFor="criteria-select">
          Criteria:{" "}
          <select id="criteria-select" className="sortPanel__select" onChange={props.OnChange} value={props.value}>
            {Criterias.map((item: CriteriaItem) => (
              <option className="sortPanel__select__option" key={`${item.name}`}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </>
  );
}
