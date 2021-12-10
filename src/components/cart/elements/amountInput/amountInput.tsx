import { ChangeEventHandler, KeyboardEvent, memo } from "react";
import styles from "styled-components";

const AmountInput = styles.input`
  width: 8vw;
  height: 1.4vw;
  border-color: $basicFontColor;
  border-radius: 5px;
  border-width: 1px;
  font-size: 1vw;
  color: $basicFontColor;
  background-color: transparent;
  padding: 0 0 0 0.3vw;

  &:focus {
    border-width: 1px;
    border-color: $basicFontColor;
    border-radius: 5px;
    outline: none;
  }
`;

const MemoizedAmountInput = memo(
  (props: { onChange: ChangeEventHandler<HTMLInputElement>; value: number }): JSX.Element => {
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      event.preventDefault();
    };

    return (
      <AmountInput
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
