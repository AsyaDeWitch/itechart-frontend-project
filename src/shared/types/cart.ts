import CartItem from "./cartItem";

type Cart = {
  id: number;
  idUser: number;
  items: CartItem[];
  totalPrice: number;
  paid: boolean;
};

export default Cart;
