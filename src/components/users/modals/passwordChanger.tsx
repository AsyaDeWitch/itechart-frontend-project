import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import * as apiProfile from "@/api/apiProfile";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import { joiPasswordSchema } from "@/helpers/formJoiSchema";
import { StatusCodes } from "http-status-codes";
import { useSelector } from "react-redux";
import { TStore } from "@/redux/store";

export default function PasswordChanger(props: { onChangePasswordButtonCloseClick: MouseEventHandler }): JSX.Element {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const validateForm = (): void => {
    const { error } = joiPasswordSchema.validate({ password, repeatPassword });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  };

  const handleInputFocusChange = (): void => {
    validateForm();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRepeatPassword(event.target.value);
  };

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
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={password}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleRepeatPasswordChange}
            type="password"
            placeholder="Password"
            label="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__buttonSubmit">
          <ButtonSubmit onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}
