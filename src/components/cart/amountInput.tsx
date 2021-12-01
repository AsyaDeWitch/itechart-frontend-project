import { ChangeEventHandler } from "react";
import "./amountInput.scss";

export default function AmountInput(props: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}): JSX.Element {
  return <input className="amountInput" type="number" min="1" onChange={props.onChange} value={props.value} />;
}
