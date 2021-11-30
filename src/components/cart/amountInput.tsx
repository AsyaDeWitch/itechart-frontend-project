import { ChangeEventHandler } from "react";
import "./amountInput.scss";

export default function AmountInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: number;
}): JSX.Element {
  return <input className="amountInput" type="number" min="0" onChange={props.onChange} value={props.value} />;
}
