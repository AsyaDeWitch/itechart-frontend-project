import { memo, MouseEventHandler } from "react";
import "./buttonUniversal.scss";

const MemoizedButtonUniversal = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement>; buttonText: string }): JSX.Element => (
    <button type="button" className="buttonUniversal" onClick={props.onClick}>
      {props.buttonText}
    </button>
  )
);

MemoizedButtonUniversal.displayName = "ButtonUniversal";

export default MemoizedButtonUniversal;
