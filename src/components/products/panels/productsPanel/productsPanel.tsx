import ProductItem from "@/shared/types/productItem";
import { memo } from "react";
import GameCardsContainer from "../../cards/gameCardsContainer";
import "./productsPanel.scss";

const MemoizedProductsPanel = memo(
  (props: { productItems: ProductItem[] }): JSX.Element => (
    <div className="productsPanel">
      Products
      <hr />
      {props.productItems.length === 0 ? (
        <p>Nothing was found for your request</p>
      ) : (
        <GameCardsContainer productItems={props.productItems} />
      )}
    </div>
  )
);

MemoizedProductsPanel.displayName = "ProductsPanel";

export default MemoizedProductsPanel;
