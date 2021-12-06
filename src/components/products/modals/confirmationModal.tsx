import ButtonClose from "@/elements/buttonClose";
import { StatusCodes } from "http-status-codes";
import { MouseEventHandler, MouseEvent, useState } from "react";
import * as apiProducts from "@/api/apiProducts";
import { useDispatch, useSelector } from "react-redux";
import { setIsNeedToUpdate } from "@/redux/slices/productsSlice";
import CartItem from "@/shared/types/cartItem";
import Cart from "@/shared/types/cart";
import { setCartData } from "@/redux/slices/cartSlice";
import * as apiCart from "@/api/apiCart";
import { TStore } from "@/redux/store";
import AnswerButton from "../elements/answerButton";

const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

export default function ConfirmationModal(props: {
  productId: number;
  productName: string;
  onButtonCloseClick: MouseEventHandler;
  onButtonYesClick: MouseEventHandler;
}): JSX.Element {
  const [formErrors, setFormErrors] = useState("");
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  const dispatch = useDispatch();

  const handleButtonYesClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      const response = await apiProducts.RemoveProduct(props.productId);
      if (response.status === StatusCodes.NO_CONTENT) {
        dispatch(setIsNeedToUpdate());
        props.onButtonYesClick(event);
        try {
          const cartResponse = await apiCart.getProductsInCart(signInUser.id);
          dispatch(setCartData(cartResponse.data));
        } catch {
          dispatch(setCartData(nullCart));
        }
      }
    } catch (error) {
      setFormErrors("Something went wrong while deleting card...");
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Confirmation</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onButtonCloseClick} />
          </div>
        </nav>
        <div className="modal__error">{formErrors}</div>
        <div className="modal__confirmation-message">
          {`Are you sure you want to delete the product "${props.productName}"`}?
        </div>
        <div className="modal__buttonSubmit">
          <AnswerButton onClick={handleButtonYesClick} buttonText="Yes" />
          <AnswerButton onClick={props.onButtonCloseClick} buttonText="No" />
        </div>
      </div>
    </div>
  );
}
