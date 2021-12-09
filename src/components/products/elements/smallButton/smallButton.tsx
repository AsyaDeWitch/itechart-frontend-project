import { memo, MouseEventHandler } from "react";
import "./smallButton.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedSmallButton = memo(function SmallButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="smallButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
});

export default MemoizedSmallButton;
