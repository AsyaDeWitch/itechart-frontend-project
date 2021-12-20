import { StatusCodes } from "http-status-codes";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler, useCallback, memo } from "react";
import ButtonSubmit from "@/elements/buttonSubmit/buttonSubmit";
import InputText from "@/elements/inputText/inputText";
import * as apiAuth from "@/api/apiAuth";
import RouteItems from "@/shared/routes/items/routeItems";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose/buttonClose";
import { joiLoggingSchema } from "@/helpers/formJoiSchema";

import { setSignInData } from "@/redux/slices/loggingSlice";

const MemoizedRegistration = memo((props: { onSignUpButtonCloseClick: MouseEventHandler }): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const memoizedValidateForm = useCallback((): void => {
    const { error } = joiLoggingSchema.validate({
      userName,
      password,
      repeatPassword,
    });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  }, [userName, password, repeatPassword]);

  const memoizedInputFocusChangeHandler = useCallback(() => {
    memoizedValidateForm();
  }, [userName, password, repeatPassword]);

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

  const memoizedRepeatPasswordChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setRepeatPassword(event.target.value);
    },
    [repeatPassword]
  );

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      try {
        const response = await apiAuth.signUp(userName, password);
        if (response.status === StatusCodes.CREATED) {
          dispatch(setSignInData(response.data));
          props.onSignUpButtonCloseClick(event);
          history.push(RouteItems.Profile.url);
        }
      } catch (error) {
        setFormErrors("User with such name already exists");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Sign Up</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onSignUpButtonCloseClick} />
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
        <div className="modal__input">
          <InputText
            onChange={memoizedRepeatPasswordChangeHandler}
            type="password"
            placeholder="Password"
            label="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
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

MemoizedRegistration.displayName = "Registration";

export default MemoizedRegistration;
