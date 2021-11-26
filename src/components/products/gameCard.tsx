import ProductItem from "@/shared/types/productItem";
import "./gameCard.scss";

export default function GameCard(props: { productItem: ProductItem; image: string }): JSX.Element {
  return (
    <div className="game-card">
      <img className="game-card__image" src={props.image} alt={props.productItem.name} />
      <p className="game-card__name">{props.productItem.name}</p>
      <p className="game-card__platform">{`$${props.productItem.price} ${props.productItem.totalRating}`}</p>
    </div>
  );
}
