import { memo, MouseEventHandler } from "react";
import "./createCardButton.scss";

const MemoizedCreateProductButton = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement>; buttonText: string }): JSX.Element => (
    <button type="button" className="createCardButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  )
);

MemoizedCreateProductButton.displayName = "CreateProductButton";

export default MemoizedCreateProductButton;
