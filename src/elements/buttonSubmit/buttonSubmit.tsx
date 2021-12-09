import { memo, MouseEventHandler } from "react";
import "./buttonSubmit.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedButtonSubmit = memo(function ButtonSubmit(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
}): JSX.Element {
  return (
    <button type="submit" className="buttonSubmit" onClick={props.onClick}>
      Submit
    </button>
  );
});

export default MemoizedButtonSubmit;
