import CartItem from "@/shared/types/cartItem";
import debounce from "lodash/debounce";
import { ChangeEvent, useState } from "react";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";

export default function CartTableItem(props: { onCartUpdate: () => void; cartItem: CartItem }): JSX.Element {
  const [platform, setPlatform] = useState(Categories[props.cartItem.choosedPlatform - 1].name);
  const [amount, setAmount] = useState(props.cartItem.amount);
  const [checked, setChecked] = useState();

  const handleDebouncedAmountInputChange = debounce((event) => {
    setAmount(event.target.value);
    // alert("Smth changed");
    // props.onCartUpdate();
  }, 500);

  const handleAmountInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // debounce
    // handleDebouncedAmountInputChange(event);
    console.log(event.target.value);
    // if (!isNaN(parseInt(event.target.value, 10)) || event.target.value === "") {
    setAmount(Number(event.target.value));
    // }
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // debounce
    // handleDebouncedAmountInputChange(event);
    console.log(event.target.value);
    // if (!isNaN(parseInt(event.target.value, 10)) || event.target.value === "") {
    setPlatform(event.target.value);
    // }
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
        <input type="checkbox" />{" "}
      </td>
    </tr>
  );
}
