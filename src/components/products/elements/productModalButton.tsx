import { memo, MouseEventHandler } from "react";

const MemoizedProductModalButton = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement>; buttonText: string }): JSX.Element => (
    <button type="button" className="buttonSubmit" onClick={props.onClick}>
      {props.buttonText}
    </button>
  )
);

MemoizedProductModalButton.displayName = "ProductModalButton";

export default MemoizedProductModalButton;
