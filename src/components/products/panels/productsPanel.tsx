import ProductItem from "@/shared/types/productItem";
import GameCardsContainer from "../cards/gameCardsContainer";
import "./productsPanel.scss";

export default function ProductsPanel(props: { productItems: ProductItem[] }): JSX.Element {
  return (
    <div className="productsPanel">
      Products
      <hr />
      {props.productItems.length === 0 ? (
        <p>Nothing was found for your request</p>
      ) : (
        <GameCardsContainer productItems={props.productItems} />
      )}
    </div>
  );
}
