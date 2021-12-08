import { TStore } from "@/redux/store";
import ProductItem from "@/shared/types/productItem";
import { useDispatch, useSelector } from "react-redux";
import "./gameCard.scss";
import * as apiCart from "@/api/apiCart";
import SmallButton from "@/components/products/elements/smallButton/smallButton";
import { memo, useState } from "react";
import Modal from "@/elements/modal";
import { setCartData } from "@/redux/slices/cartSlice";
import CartItem from "@/shared/types/cartItem";
import Cart from "@/shared/types/cart";
import ConfirmationModal from "../modals/confirmationModal";
import ProductModal from "../modals/productModal";

const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

function GameCard(props: { productItem: ProductItem; image: string }): JSX.Element {
  const { isLoggedIn, signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const [isShownConfirmation, setIsShownConfirmation] = useState(false);
  const [isShownProductModal, setIsShownProductModal] = useState(false);
  const dispatch = useDispatch();
  //
  const handleAddToCartButtonClick = async () => {
    try {
      await apiCart.addProductToCart(signInUser.id, props.productItem, props.productItem.platform[0]);
      alert("Product successfully added to cart");
      try {
        const response = await apiCart.getProductsInCart(signInUser.id);
        dispatch(setCartData(response.data));
      } catch {
        dispatch(setCartData(nullCart));
      }
    } catch {
      alert("Something went wrong");
    }
  };
  //
  const handleEditButtonClick = () => {
    setIsShownProductModal(true);
  };
  //
  const handleEditButtonCloseClick = () => {
    setIsShownProductModal(false);
  };
  //
  const handleRemoveButtonClick = () => {
    setIsShownConfirmation(true);
  };
  //
  const handleRemoveButtonCloseClick = () => {
    setIsShownConfirmation(false);
  };

  return (
    <>
      <div className="game-card">
        <img className="game-card__image" src={props.image} alt={props.productItem.name} />
        <p className="game-card__name">{props.productItem.name}</p>

        <div className="game-card__info">
          <span className="game-card__info__name">{`$${props.productItem.price}`}</span>
          <span className="game-card__info__star">&#10032;</span>
          <span className="game-card__info__rating">{props.productItem.totalRating}</span>
        </div>
      </div>
      <div className="game-card__back">
        <div className="game-card__description__container">
          <p className="game-card__description">{props.productItem.description}</p>
        </div>

        {isLoggedIn ? (
          <>
            {signInUser.role === "admin" ? (
              <div className="game-card__back__admin-button-holder">
                <SmallButton onClick={handleAddToCartButtonClick} buttonText="Add to cart" />
                <div className="game-card__back__admin-button-holder__inline">
                  <SmallButton onClick={handleEditButtonClick} buttonText="Edit" />
                  <SmallButton onClick={handleRemoveButtonClick} buttonText="Remove" />
                </div>
              </div>
            ) : (
              <div className="game-card__back__main-button-holder">
                <SmallButton onClick={handleAddToCartButtonClick} buttonText="Add to cart" />
              </div>
            )}
          </>
        ) : null}
      </div>
      {isShownConfirmation ? (
        <Modal>
          <ConfirmationModal
            productId={props.productItem.id}
            productName={props.productItem.name}
            onButtonCloseClick={handleRemoveButtonCloseClick}
            onButtonYesClick={handleRemoveButtonCloseClick}
          />
        </Modal>
      ) : null}
      {isShownProductModal ? (
        <Modal>
          <ProductModal oldProduct={props.productItem} onButtonCloseClick={handleEditButtonCloseClick} />
        </Modal>
      ) : null}
    </>
  );
}

export default memo(GameCard);
