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
            <th>Name</th>
            <th>Platform</th>
            <th>Order date</th>
            <th>Amount</th>
            <th>Price</th>
            <th> </th>
          </tr>
          {cart.items.map((item) => (
            <CartTableItem key={item.id} onCartUpdate={handleAmountInputChange} cartItem={item} />
          ))}
        </tbody>
      </table>
      <SmallButton onClick={handleRemoveButtonClick} buttonText="Remove" />
      <p>{`Games cost ${cart.totalPrice}`}</p>
      <p>{`Your balance ${userBalance}`}</p>
      <SmallButton onClick={handleBuyButtonClick} buttonText="Buy" />
    </div>
  );
}
