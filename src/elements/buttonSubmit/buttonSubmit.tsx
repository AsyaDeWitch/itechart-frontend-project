// identity-obj-proxy
import { memo, MouseEventHandler } from "react";
// import "./buttonSubmit.scss";

const MemoizedButtonSubmit = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement> }): JSX.Element => (
    <button type="submit" className="buttonSubmit" onClick={props.onClick}>
      Submit
    </button>
  )
);

MemoizedButtonSubmit.displayName = "ButtonSubmit";

export default MemoizedButtonSubmit;
