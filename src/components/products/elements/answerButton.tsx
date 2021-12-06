import { MouseEventHandler } from "react";
import "./answerButton.scss";

export default function AnswerButton(props: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  buttonText: string;
}): JSX.Element {
  return (
    <button type="submit" className="answerButton" onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
}
