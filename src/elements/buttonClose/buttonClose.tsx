import { memo, MouseEventHandler } from "react";
import imgClose from "images/header/close.png";
import "./buttonClose.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedButtonClose = memo(function ButtonClose(props: { onClick: MouseEventHandler }): JSX.Element {
  return (
    <button type="button" className="buttonClose" onClick={props.onClick}>
      <img src={imgClose} alt="close" className="buttonClose__icon" />
    </button>
  );
});

export default MemoizedButtonClose;
