import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler, FocusEvent } from "react";
import RouteItems from "@/shared/routes/items/routeItems";
import { useHistory } from "react-router-dom";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import FormJoiSchema from "@/helpers/formJoiSchema";
import { StatusCodes } from "http-status-codes";

export default function Registration(props: {
  onSignIn(user: User): void;
  onSignUpButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();

  const validateForm = (): void => {
    const { error } = FormJoiSchema.validate({ userName, password, repeatPassword });
    if (error !== undefined) {
      if (error.message === undefined) {
        setIsFormValid(true);
        setFormErrors("");
      } else {
        setFormErrors(error.message as string);
      }
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  };

  const handleInputFocusChange = (_: FocusEvent<HTMLInputElement>): void => {
    validateForm();
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
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
        const response = await apiAuth.signUp(userName, password);
        if (response.status === StatusCodes.CREATED) {
          props.onSignIn(response.data);
          props.onSignUpButtonCloseClick(event);
          history.push(RouteItems.Profile.url);
        }
      } catch (error) {
        console.log(error);
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
            onChange={handleUserNameChange}
            type="text"
            placeholder="Name"
            label="Name"
            name="userName"
            value={userName}
            onBlur={handleInputFocusChange}
          />
        </div>
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
