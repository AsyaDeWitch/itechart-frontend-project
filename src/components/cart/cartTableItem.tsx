import CartItem from "@/shared/types/cartItem";
import debounce from "lodash/debounce";
import { ChangeEvent, useState } from "react";
import Categories from "@/shared/categories/gameCategories";
import PlatformSelect from "./platformSelect";
import AmountInput from "./amountInput";

export default function CartTableItem(props: {
  onCartUpdate: (name: string, amount: number) => void;
  cartItem: CartItem;
}): JSX.Element {
  const [platform, setPlatform] = useState(Categories[props.cartItem.choosedPlatform - 1].name);
  const [amount, setAmount] = useState(props.cartItem.amount);
  const [checked, setChecked] = useState(false);

  const handleDebouncedAmountInputChange = debounce((event) => {
    console.log("here");
    // setAmount(Number(event.target.value));
  }, 500);

  const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    // debounce
    handleDebouncedAmountInputChange(event);
    setAmount(Number(event.target.value));
    // update cart
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // debounce
    // handleDebouncedAmountInputChange(event);
    setPlatform(event.target.value);
    // update cart
  };

  return (
    <tr>
      <td className="cart__table__name">{props.cartItem.product.name}</td>
      <td className="cart__table__platform">
        <PlatformSelect onChange={handleCategoryChange} value={platform} />
      </td>
      <td className="cart__table__date">{props.cartItem.date}</td>
      <td className="cart__table__amount">
        <AmountInput onChange={handleAmountInputChange} value={amount} />
      </td>
      <td className="cart__table__price">
        {Math.round(props.cartItem.product.price * props.cartItem.amount * 100) / 100}
      </td>
      <td className="cart__table__remove-check">
        <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />{" "}
      </td>
    </tr>
  );
}
