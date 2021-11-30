import { useEffect, useState } from "react";
import "./cart.scss";
import * as apiCart from "@/api/apiCart";
import * as apiProfile from "@/api/apiProfile";
import { useSelector } from "react-redux";
import { TStore } from "@/redux/store";
import Cart from "@/shared/types/cart";
import CartItem from "@/shared/types/cartItem";
import SmallButton from "../products/smallButton";
import CartTableItem from "./cartTableItem";

const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems, totalPrice: 0, paid: false };

export default function Cart(): JSX.Element {
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const [userBalance, setUserBalance] = useState(0);
  const [cart, setCart] = useState(nullCart);

  const getUserCart = async () => {
    try {
      const response = await apiCart.getProductsInCart(signInUser.id);
      setCart(response.data);
    } catch {
      alert("Something went wrong");
    }
  };

  const getUserBalance = async () => {
    try {
      const response = await apiProfile.getBalance(signInUser.id);
      setUserBalance(response.data);
    } catch {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getUserCart();
    getUserBalance();
  }, []);

  const handleRemoveButtonClick = () => {
    alert("Smth remove");
  };

  const handleBuyButtonClick = () => {
    alert("Smth buy");
  };

  const handleAmountInputChange = () => {
    alert("here");
  };

  return (
    <div className="cart">
      <h2>Cart page</h2>
      <hr />
      <table className="cart__table">
        <tbody>
          <tr>
            <th className="cart__table__name">Name</th>
            <th className="cart__table__platform">Platform</th>
            <th className="cart__table__date">Order date</th>
            <th className="cart__table__amount">Amount</th>
            <th className="cart__table__price">Price($)</th>
            <th className="cart__table__remove-check"> </th>
          </tr>
          {cart.items.map((item) => (
            <CartTableItem key={item.id} onCartUpdate={handleAmountInputChange} cartItem={item} />
          ))}
        </tbody>
      </table>
      <div className="cart__remove-button">
        <SmallButton onClick={handleRemoveButtonClick} buttonText="Remove" />
        <hr />
      </div>

      <div className="cart__balance-part">
        <p className="cart__balance-part__cost">{`Games cost:  ${cart.totalPrice}$`}</p>
        <p className="cart__balance-part__balance">{`Your balance:  ${userBalance}$`}</p>
        <div className="cart__balance-part__buy-button">
          <SmallButton onClick={handleBuyButtonClick} buttonText="Buy" />
        </div>
      </div>
    </div>
  );
}
