import { memo, MouseEventHandler } from "react";
import "./smallButton.scss";

const MemoizedSmallButton = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement>; buttonText: string }): JSX.Element => (
    <button type="button" className="smallButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  )
);

MemoizedSmallButton.displayName = "SmallButton";

export default MemoizedSmallButton;
