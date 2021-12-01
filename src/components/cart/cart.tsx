import { useEffect, useMemo, useState } from "react";
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
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

export default function Cart(): JSX.Element {
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const [userBalance, setUserBalance] = useState(0);
  const [cart, setCart] = useState(nullCart);
  const [checkedItems, setCheckedItems] = useState(nullItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getTotalPrice = (): number => {
    let sum = 0;
    for (let i = 0; i < checkedItems.length; i++) {
      sum += checkedItems[i].product.price * checkedItems[i].amount;
    }

    return Math.round(sum * 100) / 100;
  };

  // const reducer = (acc: number, curr: CartItem) => {
  //  acc += curr.product.price * curr.amount;
  // };

  // const totalPrice = useMemo(() => getTotalPrice(), [checkedItems]);
  const totalPrice = useMemo(
    () =>
      Object.values(checkedItems).reduce(
        (acc, curr) => Math.round((acc + curr.product.price * curr.amount) * 100) / 100,
        0
      ),
    [checkedItems, cart]
  );

  const getUserCart = async () => {
    try {
      const response = await apiCart.getProductsInCart(signInUser.id);
      setCart(response.data);
    } catch {
      setCart(nullCart);
    }
  };

  const getUserBalance = async () => {
    try {
      const response = await apiProfile.getBalance(signInUser.id);
      setUserBalance(response.data);
    } catch {
      setErrorMessage("Something went wrong while getting user balance");
    }
  };

  const updateCart = () => {
    getUserCart();
    getUserBalance();
  };

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  useEffect(() => {
    updateCart();
    setCheckedItems([]);
    clearMessages();
  }, []);

  const handleRemoveButtonClick = async () => {
    clearMessages();
    if (checkedItems.length !== 0) {
      try {
        await apiCart.removeProductsFromCart(signInUser.id, checkedItems);
        updateCart();
      } catch {
        setErrorMessage("Something went wrong while removing products from cart");
      }
    } else {
      setErrorMessage("Nothing to remove");
    }
  };

  const handleBuyButtonClick = async () => {
    clearMessages();
    if (checkedItems.length !== 0) {
      if (userBalance >= totalPrice) {
        try {
          await apiCart.buyProductsFromCart(signInUser.id, checkedItems, totalPrice);
          updateCart();
          setSuccessMessage("Successfully bought products from cart");
        } catch {
          setErrorMessage("Something went wrong while buying products");
        }
      } else {
        setErrorMessage("You haven't enough money to pay products from cart");
      }
    } else {
      setErrorMessage("Nothing to buy");
    }
  };

  const handleProductCategoryChange = async (cartItem: CartItem) => {
    clearMessages();
    try {
      await apiCart.changeProductChoosedPlatformInCart(signInUser.id, cartItem.product, cartItem.choosedPlatform);
    } catch {
      setErrorMessage("Something went wrong while changing product amount");
    }
  };

  const handleProductAmountChange = async (cartItem: CartItem) => {
    clearMessages();
    try {
      await apiCart.changeProductQuantityInCart(signInUser.id, cartItem.product, cartItem.amount);
      const index = checkedItems.findIndex((item) => item.id === cartItem.id);
      if (index >= 0) {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = cartItem;
        setCheckedItems(newCheckedItems);
      }
    } catch {
      setErrorMessage("Something went wrong while changing product amount");
    }
  };

  const handleCheckedItemsUpdate = (cartItem: CartItem, checked: boolean) => {
    clearMessages();
    if (checked) {
      const newCheckedItems = [...checkedItems, cartItem];
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedItems(checkedItems.filter((item) => item.id !== cartItem.id));
    }
  };

  return (
    <div className="cart">
      <h2 className="cart__title">Cart page</h2>
      <hr />
      <div className="cart__messages">
        <div className="cart__messages__error">{errorMessage}</div>
        <div className="cart__messages__success">{successMessage}</div>
      </div>
      {cart.items.length === 0 ? (
        <>
          <div className="cart__empty">
            <span className="cart__empty__message">You haven&apos;t any products in cart</span>
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="cart__table-panel">
            <table className="cart__table">
              <thead>
                <tr className="cart__table__bottom-line">
                  <th className="cart__table__name">Name</th>
                  <th className="cart__table__platform">Platform</th>
                  <th className="cart__table__date">Order date</th>
                  <th className="cart__table__amount">Amount</th>
                  <th className="cart__table__price">Price($)</th>
                  <th className="cart__table__remove-check"> </th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <CartTableItem
                    key={item.id}
                    onProductCategoryChange={handleProductCategoryChange}
                    onProductAmountChange={handleProductAmountChange}
                    onCheckedItemsUpdate={handleCheckedItemsUpdate}
                    cartItem={item}
                  />
                ))}
              </tbody>
            </table>
            <div className="cart__remove-button">
              <SmallButton onClick={handleRemoveButtonClick} buttonText="Remove" />
            </div>
          </div>
          <hr />
          <div className="cart__balance-part">
            <p className="cart__balance-part__cost">{`Games cost:  ${totalPrice}$`}</p>
            <p className="cart__balance-part__balance">{`Your balance:  ${userBalance}$`}</p>
            <div className="cart__balance-part__buy-button">
              <SmallButton onClick={handleBuyButtonClick} buttonText="Buy" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
