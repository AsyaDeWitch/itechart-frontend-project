import CartItem from "@/shared/types/cartItem";
import { ChangeEvent, memo, useCallback, useState } from "react";
import Categories from "@/shared/categories/gameCategories";
import PlatformSelect from "../platformSelect/platformSelect";
import AmountInput from "../amountInput/amountInput";
import "./cartTableItem.scss";

function CartTableItem(props: {
  onProductCategoryChange: (cartItem: CartItem) => void;
  onProductAmountChange: (cartItem: CartItem) => void;
  onCheckedItemsUpdate: (cartItem: CartItem, checked: boolean) => void;
  cartItem: CartItem;
}): JSX.Element {
  const [platform, setPlatform] = useState(
    (Categories.find((category) => category.id === props.cartItem.choosedPlatform) || Categories[0]).name
  );
  const [amount, setAmount] = useState(props.cartItem.amount);
  const [checked, setChecked] = useState(false);

  const memoizedAmountInputChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAmount(Number(event.target.value));
      const updatedCartItem = { ...props.cartItem };
      updatedCartItem.amount = Number(event.target.value);
      props.onProductAmountChange(updatedCartItem);
    },
    [amount, checked]
  );

  const memoizedCategoryChangeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setPlatform(event.target.value);
      const updatedCartItem = { ...props.cartItem };
      updatedCartItem.choosedPlatform = Categories.filter((category) => category.name === event.target.value)[0].id;
      props.onProductCategoryChange(updatedCartItem);
    },
    [platform]
  );

  const CategoryChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setPlatform(event.target.value);
    const updatedCartItem = { ...props.cartItem };
    updatedCartItem.choosedPlatform = Categories.filter((category) => category.name === event.target.value)[0].id;
    props.onProductCategoryChange(updatedCartItem);
  };

  const memoizedCheckboxChangeHandler = useCallback(() => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.cartItem, !checked);
  }, [checked]);

  const CheckboxChangeHandler = () => {
    setChecked(!checked);
    props.onCheckedItemsUpdate(props.cartItem, !checked);
  };

  return (
    <tr className="tableItem__bottom-line">
      <td className="tableItem__name">{props.cartItem.product.name}</td>
      <td className="tableItem__platform">
        <PlatformSelect
          onChange={memoizedCategoryChangeHandler}
          value={platform}
          platforms={props.cartItem.product.platform}
        />
      </td>
      <td className="tableItem__date">{props.cartItem.date}</td>
      <td className="tableItem__amount">
        <AmountInput onChange={memoizedAmountInputChangeHandler} value={amount} />
      </td>
      <td className="tableItem__price">
        {Math.round(props.cartItem.product.price * props.cartItem.amount * 100) / 100}
      </td>
      <td className="tableItem__remove-check">
        <input className="tableItem__checkbox" type="checkbox" checked={checked} onChange={CheckboxChangeHandler} />
      </td>
    </tr>
  );
}

export default memo(CartTableItem);
