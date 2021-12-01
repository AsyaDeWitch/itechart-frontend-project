import CartItem from "@/shared/types/cartItem";
import { ChangeEvent, useState } from "react";
import Categories from "@/shared/categories/gameCategories";
import PlatformSelect from "./platformSelect";
import AmountInput from "./amountInput";
import "./cartTableItem.scss";

export default function CartTableItem(props: {
  onProductCategoryChange: (cartItem: CartItem) => void;
  onProductAmountChange: (cartItem: CartItem) => void;
  onCheckedItemsUpdate: (cartItem: CartItem, checked: boolean) => void;
  cartItem: CartItem;
}): JSX.Element {
  const [platform, setPlatform] = useState(Categories[props.cartItem.choosedPlatform - 1].name);
  const [amount, setAmount] = useState(props.cartItem.amount.toString());
  const [checked, setChecked] = useState(false);

  const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (amount === "0") {
      setAmount(event.target.value.substring(1));
    } else {
      setAmount(event.target.value);
    }

    const updatedCartItem = props.cartItem;
    updatedCartItem.amount = Number(event.target.value);
    props.onProductAmountChange(updatedCartItem);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlatform(event.target.value);
    const updatedCartItem = props.cartItem;
    updatedCartItem.choosedPlatform = Categories.filter((category) => category.name === event.target.value)[0].id;
    props.onProductCategoryChange(updatedCartItem);
  };

  const handleCheckboxChange = () => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.cartItem, !checked);
  };

  return (
    <tr className="tableItem__bottom-line">
      <td className="tableItem__name">{props.cartItem.product.name}</td>
      <td className="tableItem__platform">
        <PlatformSelect onChange={handleCategoryChange} value={platform} platforms={props.cartItem.product.platform} />
      </td>
      <td className="tableItem__date">{props.cartItem.date}</td>
      <td className="tableItem__amount">
        <AmountInput onChange={handleAmountInputChange} value={amount} />
      </td>
      <td className="tableItem__price">
        {Math.round(props.cartItem.product.price * props.cartItem.amount * 100) / 100}
      </td>
      <td className="tableItem__remove-check">
        <input
          className="tableItem__checkbox"
          type="checkbox"
          defaultChecked={checked}
          onChange={handleCheckboxChange}
        />
      </td>
    </tr>
  );
}
