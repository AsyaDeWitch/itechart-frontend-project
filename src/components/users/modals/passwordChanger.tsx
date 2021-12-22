import { StatusCodes } from "http-status-codes";
import { useSelector } from "react-redux";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler, useCallback, memo } from "react";
import ButtonSubmit from "@/elements/buttonSubmit/buttonSubmit";
import InputText from "@/elements/inputText/inputText";
import * as apiProfile from "@/api/apiProfile";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose/buttonClose";
import { joiPasswordSchema } from "@/helpers/formJoiSchema";
import { TStore } from "@/redux/store";

const MemoizedPasswordChanger = memo((props: { onChangePasswordButtonCloseClick: MouseEventHandler }): JSX.Element => {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const memoizedValidateForm = useCallback((): void => {
    const { error } = joiPasswordSchema.validate({
      password,
      repeatPassword,
    });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  }, [password, repeatPassword]);

  const memoizedInputFocusChangeHandler = useCallback(() => {
    memoizedValidateForm();
  }, [password, repeatPassword]);

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
        const response = await apiProfile.changePassword(signInUser.id, password);
        if (response.status === StatusCodes.OK) {
          props.onChangePasswordButtonCloseClick(event);
        }
      } catch (error) {
        setFormErrors("Something went wrong while changing password...");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Change password</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onChangePasswordButtonCloseClick} />
          </div>
        </nav>
        <div className="modal__error">{formErrors}</div>
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

MemoizedPasswordChanger.displayName = "PasswordChanger";

export default MemoizedPasswordChanger;
