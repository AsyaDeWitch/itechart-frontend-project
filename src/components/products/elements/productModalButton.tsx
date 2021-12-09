import { memo, MouseEventHandler } from "react";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedProductModalButton = memo(function ProductModalButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="button" className="buttonSubmit" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
});

export default MemoizedProductModalButton;
