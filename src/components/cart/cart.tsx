import { memo, useCallback, useEffect, useMemo, useState } from "react";
import "./cart.scss";
import { useDispatch, useSelector } from "react-redux";
import * as apiCart from "@/api/apiCart";
import * as apiProfile from "@/api/apiProfile";
import { TStore } from "@/redux/store";
import Cart from "@/shared/types/cart";
import CartItem from "@/shared/types/cartItem";
import { setCartData } from "@/redux/slices/cartSlice";
import SmallButton from "../products/elements/smallButton/smallButton";
import CartTableItem from "./elements/cartTableItem/cartTableItem";

const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

const MemoizedCart = memo((): JSX.Element => {
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const [userBalance, setUserBalance] = useState(0);
  const [checkedItems, setCheckedItems] = useState(nullItems);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const dispatch = useDispatch();
  const { cart } = useSelector((state: TStore) => state.reducer.cartReducer);

  const totalPrice = useMemo(
    () =>
      Object.values(checkedItems).reduce(
        (acc, curr) => Math.round((acc + curr.product.price * curr.amount) * 100) / 100,
        0
      ),
    [checkedItems, cart]
  );

  const GetUserCart = async () => {
    try {
      const response = await apiCart.getProductsInCart(signInUser.id);
      dispatch(setCartData(response.data));
    } catch {
      dispatch(setCartData(nullCart));
    }
  };

  const GetUserBalance = async () => {
    try {
      const response = await apiProfile.getBalance(signInUser.id);
      setUserBalance(response.data);
    } catch {
      setErrorMessage("Something went wrong while getting user balance");
    }
  };

  const memoizedUpdateCart = useCallback(() => {
    GetUserCart();
    GetUserBalance();
  }, [GetUserCart, GetUserBalance]);

  const memoizedClearMessages = useCallback(() => {
    setErrorMessage("");
    setSuccessMessage("");
  }, []);

  useEffect(() => {
    memoizedUpdateCart();
    setCheckedItems([]);
    memoizedClearMessages();
  }, []);

  const RemoveButtonClickHandler = async () => {
    memoizedClearMessages();
    if (checkedItems.length !== 0) {
      try {
        await apiCart.removeProductsFromCart(signInUser.id, checkedItems);
        memoizedUpdateCart();
        setCheckedItems([]);
      } catch {
        setErrorMessage("Something went wrong while removing products from cart");
      }
    } else {
      setErrorMessage("Nothing to remove");
    }
  };

  const BuyButtonClickHandler = async () => {
    memoizedClearMessages();
    if (checkedItems.length !== 0) {
      if (userBalance >= totalPrice) {
        try {
          await apiCart.buyProductsFromCart(signInUser.id, checkedItems, totalPrice);
          memoizedUpdateCart();
          setCheckedItems([]);
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

  const ProductCategoryChangeHandler = async (cartItem: CartItem) => {
    memoizedClearMessages();
    try {
      await apiCart.changeProductChoosedPlatformInCart(signInUser.id, cartItem.product, cartItem.choosedPlatform);
      memoizedUpdateCart();
    } catch {
      setErrorMessage("Something went wrong while changing product amount");
    }
  };

  const ProductAmountChange = async (cartItem: CartItem) => {
    memoizedClearMessages();
    try {
      await apiCart.changeProductQuantityInCart(signInUser.id, cartItem.product, cartItem.amount);
      const index = checkedItems.findIndex((item) => item.id === cartItem.id);
      if (index >= 0) {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = cartItem;
        setCheckedItems(newCheckedItems);
      }
      memoizedUpdateCart();
    } catch {
      setErrorMessage("Something went wrong while changing product amount");
    }
  };

  const memoizedCheckedItemsUpdateHandler = useCallback(
    (cartItem: CartItem, checked: boolean) => {
      memoizedClearMessages();
      if (checked) {
        const newCheckedItems = [...checkedItems, cartItem];
        setCheckedItems(newCheckedItems);
      } else {
        setCheckedItems(checkedItems.filter((item) => item.id !== cartItem.id));
      }
    },
    [checkedItems]
  );

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
                    onProductCategoryChange={ProductCategoryChangeHandler}
                    onProductAmountChange={ProductAmountChange}
                    onCheckedItemsUpdate={memoizedCheckedItemsUpdateHandler}
                    cartItem={item}
                  />
                ))}
              </tbody>
            </table>
            <div className="cart__remove-button">
              <SmallButton onClick={RemoveButtonClickHandler} buttonText="Remove" />
            </div>
          </div>
          <hr />
          <div className="cart__balance-part">
            <p className="cart__balance-part__cost">{`Games cost:  ${totalPrice}$`}</p>
            <p className="cart__balance-part__balance">{`Your balance:  ${userBalance}$`}</p>
            <div className="cart__balance-part__buy-button">
              <SmallButton onClick={BuyButtonClickHandler} buttonText="Buy" />
            </div>
          </div>
        </>
      )}
    </div>
  );
});

MemoizedCart.displayName = "Cart";

export default MemoizedCart;
