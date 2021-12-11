import { memo, MouseEventHandler } from "react";
import imgClose from "images/header/close.png";
import "./buttonClose.scss";

const MemoizedButtonClose = memo(
  (props: { onClick: MouseEventHandler }): JSX.Element => (
    <button type="button" className="buttonClose" onClick={props.onClick}>
      <img src={imgClose} alt="close" className="buttonClose__icon" />
    </button>
  )
);

MemoizedButtonClose.displayName = "ButtonClose";

export default MemoizedButtonClose;
