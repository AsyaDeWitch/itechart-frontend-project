import ProductItem from "./productItem";

type CartItem = {
  id: number;
  product: ProductItem;
  date: string;
  amount: number;
  choosedPlatform: number;
};

export default CartItem;
