import { ChangeEventHandler, KeyboardEvent } from "react";
import "./amountInput.scss";

export default function AmountInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
}): JSX.Element {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  return (
    <input
      className="amountInput"
      type="number"
      min="1"
      onChange={props.onChange}
      value={props.value}
      onKeyDown={handleKeyDown}
    />
  );
}
