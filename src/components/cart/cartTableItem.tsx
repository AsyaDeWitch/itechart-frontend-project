import CartItem from "@/shared/types/cartItem";
import debounce from "lodash/debounce";
import { ChangeEvent, useState } from "react";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";

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
      <td>{props.cartItem.product.name}</td>
      <td>
        <select id="type-select" className="select" onChange={handleCategoryChange} value={platform}>
          {Categories.map((item: CategoryItem) => (
            <option className="select__option" key={`${item.name}`}>
              {item.name}
            </option>
          ))}
        </select>
      </td>
      <td>{props.cartItem.date}</td>
      <td>
        <input type="number" min="0" onChange={handleAmountInputChange} value={amount} />
      </td>
      <td>{Math.round(props.cartItem.product.price * props.cartItem.amount * 100) / 100}</td>
      <td>
        <input type="checkbox" defaultChecked={checked} onChange={() => setChecked(!checked)} />{" "}
      </td>
    </tr>
  );
}
