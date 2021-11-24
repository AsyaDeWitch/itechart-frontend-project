import gameImages from "@/shared/games/gameImages";
import ProductItem from "@/shared/types/productItem";
import GameCard from "./gameCard";
import "./gameCardContainer.scss";

export default function GameCardsContainer(props: { productItems: ProductItem[] }): JSX.Element {
  return (
    <>
      <ul className="game__cards-container">
        {props.productItems.map((item: ProductItem) => (
          <li
            key={item.id.toString().concat(item.name)}
            className="game__card-container"
            onClick={() => alert("got product!")}
            onKeyPress={() => alert("got product!")}
            role="menuitem"
          >
            <GameCard
              key={item.id}
              productItem={item}
              image={gameImages.filter((image) => image.includes(item.logo as string))[0]}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
