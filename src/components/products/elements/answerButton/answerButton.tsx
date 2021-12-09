import { memo, MouseEventHandler } from "react";
import "./answerButton.scss";

const MemoizedAnswerButton = memo(
  (props: { onClick: MouseEventHandler<HTMLButtonElement>; buttonText: string }): JSX.Element => (
    <button type="submit" className="answerButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  )
);

MemoizedAnswerButton.displayName = "AnswerButton";

export default MemoizedAnswerButton;
