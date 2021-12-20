import { memo } from "react";
import ProductItem from "@/shared/types/productItem";
import GameCard from "./gameCard";
import "./gameCardContainer.scss";

const MemoizedGameCardsContainer = memo(
  (props: { productItems: ProductItem[] }): JSX.Element => (
    <>
      <ul className="game__cards-container">
        {props.productItems.map((item: ProductItem) => (
          <li key={item.id.toString().concat(item.name)} className="game__card-container" role="menuitem">
            <div className="game__card-holder">
              <GameCard key={item.id} productItem={item} image={item.logo} />
            </div>
          </li>
        ))}
      </ul>
    </>
  )
);

MemoizedGameCardsContainer.displayName = "GameCardsContainer";

export default MemoizedGameCardsContainer;
