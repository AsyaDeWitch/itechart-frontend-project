import { StatusCodes } from "http-status-codes";
import { useDispatch } from "react-redux";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler, useCallback, memo } from "react";
import ButtonSubmit from "@/elements/buttonSubmit/buttonSubmit";
import InputText from "@/elements/inputText/inputText";
import * as apiAuth from "@/api/apiAuth";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose/buttonClose";
import { joiLoggingSchema } from "@/helpers/formJoiSchema";
import { setSignInData } from "@/redux/slices/loggingSlice";
import * as apiCart from "@/api/apiCart";
import { setCartData } from "@/redux/slices/cartSlice";
import CartItem from "@/shared/types/cartItem";
import Cart from "@/shared/types/cart";

const nullItems: CartItem[] = [];
const nullCart: Cart = { id: 0, idUser: 0, items: nullItems };

const MemoizedLogin = memo((props: { onSignInButtonCloseClick: MouseEventHandler }): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();

  const memoizedValidateForm = useCallback((): void => {
    const { error } = joiLoggingSchema.validate({
      userName,
      password,
    });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  }, [userName, password]);

  const memoizedInputFocusChangeHandler = useCallback(() => {
    memoizedValidateForm();
  }, [userName, password]);

  const memoizedUserNameChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setUserName(event.target.value);
    },
    [userName]
  );

  const memoizedPasswordChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setPassword(event.target.value);
    },
    [password]
  );

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      try {
        const response = await apiAuth.signIn(userName, password);
        if (response.status === StatusCodes.OK) {
          dispatch(setSignInData(response.data));
          props.onSignInButtonCloseClick(event);
          try {
            const responseCart = await apiCart.getProductsInCart(response.data.id);
            dispatch(setCartData(responseCart.data));
          } catch {
            dispatch(setCartData(nullCart));
          }
        }
      } catch (error) {
        setFormErrors("Invalid user name or password");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Sign In</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onSignInButtonCloseClick} />
          </div>
        </nav>
        <div className="modal__error">{formErrors}</div>
        <div className="modal__input">
          <InputText
            onChange={memoizedUserNameChangeHandler}
            type="text"
            placeholder="Name"
            label="Name"
            name="userName"
            value={userName}
            onBlur={memoizedInputFocusChangeHandler}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={memoizedPasswordChangeHandler}
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={password}
            onBlur={memoizedInputFocusChangeHandler}
          />
        </div>
        <div className="modal__buttonSubmit">
          <ButtonSubmit onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
});

MemoizedLogin.displayName = "Login";

export default MemoizedLogin;
