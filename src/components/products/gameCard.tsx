import { TStore } from "@/redux/store";
import ProductItem from "@/shared/types/productItem";
import { useSelector } from "react-redux";
import "./gameCard.scss";
import * as apiCart from "@/api/apiCart";
import SmallButton from "./smallButton";

export default function GameCard(props: { productItem: ProductItem; image: string }): JSX.Element {
  const { isLoggedIn, signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const handleAddToCartButtonClick = async () => {
    try {
      await apiCart.addProductToCart(signInUser.id, props.productItem, props.productItem.platform[0]);
      alert("Product successfully added to cart");
    } catch {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div className="game-card">
        <img className="game-card__image" src={props.image} alt={props.productItem.name} />
        <p className="game-card__name">{props.productItem.name}</p>
        <p className="game-card__platform">{`$${props.productItem.price} ${props.productItem.totalRating}`}</p>
      </div>
      <div className="game-card__back">
        <div className="game-card__description__container">
          <p className="game-card__description">{props.productItem.description}</p>
        </div>

        {isLoggedIn ? <SmallButton onClick={handleAddToCartButtonClick} buttonText="Add to cart" /> : null}
      </div>
    </>
  );
}
