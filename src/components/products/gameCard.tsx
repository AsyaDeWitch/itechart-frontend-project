import ProductItem from "../../shared/types/productItem";

export default function GameCard(props: { productItem: ProductItem }): JSX.Element {
  return (
    <div onClick={() => alert("got product!")}>
      <h2>Game {props.productItem.name}</h2>
    </div>
  );
}
