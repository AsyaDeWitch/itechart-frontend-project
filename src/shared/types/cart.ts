import CartItem from "./cartItem";

type Cart = {
  id: number;
  idUser: number;
  items: CartItem[];
};

export default Cart;
