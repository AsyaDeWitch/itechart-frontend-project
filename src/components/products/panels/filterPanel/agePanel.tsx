import { ChangeEventHandler, memo } from "react";
import Ages from "@/mockData/ages.json";
import AgeItem from "@/shared/games/ageItem";
import "./filterPanel.scss";

const MemoizedAgePanel = memo(
  (props: { value: string; OnChange: ChangeEventHandler<HTMLInputElement> }): JSX.Element => (
    <>
      Age
      <hr />
      <div className="filterPanel">
        <div className="filterPanel__item">
          <label htmlFor="all ages">
            <input type="radio" id="all ages" value="" checked={props.value === ""} onChange={props.OnChange} /> All
            ages
          </label>
        </div>
        {Ages.map((item: AgeItem) => (
          <div className="filterPanel__item" key={item.id}>
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
  )
);

MemoizedAgePanel.displayName = "AgePanel";

export default MemoizedAgePanel;
