import { memo, MouseEventHandler } from "react";
import "./createCardButton.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedCreateProductButton = memo(function CreateProductButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="createCardButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
});

export default MemoizedCreateProductButton;
