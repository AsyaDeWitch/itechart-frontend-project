import ProductItem from "@/shared/types/productItem";
import { memo } from "react";
import GameCardsContainer from "../../cards/gameCardsContainer";
import "./productsPanel.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedProductsPanel = memo(function ProductsPanel(props: { productItems: ProductItem[] }): JSX.Element {
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
});

export default MemoizedProductsPanel;
