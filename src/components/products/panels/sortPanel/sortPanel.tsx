import { ChangeEventHandler, memo } from "react";
import Criterias from "@/mockData/criterias.json";
import SortTypes from "@/mockData/sortTypes.json";
import CriteriaItem from "@/shared/types/games/criteriaItem";
import "./sortPanel.scss";
import TypeItem from "@/shared/types/games/typeItem";

const MemoizedSortPanel = memo(
  (props: {
    criteriaValue: string;
    typeValue: string;
    OnCriteriaChange: ChangeEventHandler<HTMLSelectElement>;
    OnTypeChange: ChangeEventHandler<HTMLSelectElement>;
  }): JSX.Element => (
    <>
      Sort
      <hr />
      <div className="sortItems">
        <div className="sortItems__criteria">
          <label className="sortItems__label" htmlFor="criteria-select">
            Criteria:
            <select
              id="criteria-select"
              className="sortItems__select"
              onChange={props.OnCriteriaChange}
              value={props.criteriaValue}
            >
              {Criterias.map((item: CriteriaItem) => (
                <option className="sortItems__select__option" key={`${item.name}`}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="sortItems__type">
          <label className="sortItems__label" htmlFor="type-select">
            Type:
            <select
              id="type-select"
              className="sortItems__select"
              onChange={props.OnTypeChange}
              value={props.typeValue}
            >
              {SortTypes.map((item: TypeItem) => (
                <option className="sortItems__select__option" key={`${item.name}`}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </>
  )
);

MemoizedSortPanel.displayName = "SortPanel";

export default MemoizedSortPanel;
