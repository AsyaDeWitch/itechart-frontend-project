import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cart from "@/shared/types/cart";
import CartItem from "@/shared/types/cartItem";

const nullCartItemsQuantity = 0;
const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

interface CartState {
  cart: Cart;
  cartItemsQuantity: number;
}

const initialState = { cart: nullCart, cartItemsQuantity: nullCartItemsQuantity } as CartState;

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<Cart>) {
      return {
        ...state,
        cart: action.payload,
        cartItemsQuantity: action.payload.items.length,
      };
    },
  },
});

export const { setCartData } = CartSlice.actions;
export default CartSlice.reducer;
