import { ChangeEventHandler, KeyboardEvent, memo } from "react";
import "./amountInput.scss";

const MemoizedAmountInput = memo(
  (props: { onChange: ChangeEventHandler<HTMLInputElement>; value: number }): JSX.Element => {
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
);

MemoizedAmountInput.displayName = "AmountInput";

export default MemoizedAmountInput;
