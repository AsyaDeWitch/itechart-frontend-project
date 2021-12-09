import { memo, MouseEventHandler } from "react";
import "./buttonUniversal.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedButtonUniversal = memo(function ButtonUniversal(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="buttonUniversal" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
});

export default MemoizedButtonUniversal;
