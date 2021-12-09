import { memo, MouseEventHandler } from "react";
import "./answerButton.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedAnswerButton = memo(function AnswerButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="submit" className="answerButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
});

export default MemoizedAnswerButton;
