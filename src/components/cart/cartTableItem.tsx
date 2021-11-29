import CartItem from "@/shared/types/cartItem";
import debounce from "lodash/debounce";
import { ChangeEvent, useState } from "react";

export default function CartTableItem(props: { onCartUpdate: () => void; cartItem: CartItem }): JSX.Element {
  const [platform, setPlatform] = useState(props.cartItem.choosedPlatform);
  const [amount, setAmount] = useState(props.cartItem.amount);

  const handleDebouncedAmountInputChange = debounce((event) => {
    setAmount(Number(event.target.value));
    alert("Smth changed");
    props.onCartUpdate();
  }, 500);

  const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // debounce
    handleDebouncedAmountInputChange(event);
  };

  return (
    <tr>
      <td>{props.cartItem.product.name}</td>
      <td>{props.cartItem.choosedPlatform}</td>
      <td>{props.cartItem.date}</td>
      <td>
        <input onChange={handleAmountInputChange} value={amount} />
      </td>
      <td>{Math.round(props.cartItem.product.price * props.cartItem.amount * 100) / 100}</td>
      <td> </td>
    </tr>
  );
}
