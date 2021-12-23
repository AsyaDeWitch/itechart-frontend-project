import { ChangeEventHandler, memo } from "react";
import PanelItem from "@/shared/games/panelItem";
import "./filterPanel.scss";

const MemoizedAgePanel = memo(
  (props: {
    value: string;
    title: string;
    defaultValueName: string;
    panelItems: PanelItem[];
    OnChange: ChangeEventHandler<HTMLInputElement>;
  }): JSX.Element => (
    <>
      {props.title}
      <hr />
      <div className="filterPanel">
        <div className="filterPanel__item">
          <label htmlFor={props.defaultValueName} className="filterPanel__label">
            <input
              type="radio"
              id={props.defaultValueName}
              value=""
              checked={props.value === ""}
              onChange={props.OnChange}
              className="filterPanel__checkbox"
            />{" "}
            {props.defaultValueName}
          </label>
        </div>
        {props.panelItems.map((item) => (
          <div className="filterPanel__item" key={item.id}>
            <label htmlFor={item.name} className="filterPanel__label">
              <input
                type="radio"
                id={item.name}
                value={item.name}
                checked={props.value === item.name}
                onChange={props.OnChange}
                className="filterPanel__checkbox"
              />{" "}
              {item.description}
            </label>
          </div>
        ))}
      </div>
    </>
  )
);

MemoizedAgePanel.displayName = "FilterPanel";

export default MemoizedAgePanel;
