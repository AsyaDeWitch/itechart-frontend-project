import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import FormErrors from "@/elements/formErrors";
import RouteItems from "@/shared/routes/items/routeItems";
import { useHistory } from "react-router-dom";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";

export default function Registration(props: {
  onSignIn(user: User): void;
  onSignUpButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ userName: "", password: "" });
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isRepeatPasswordValid, setIsRepeatPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const history = useHistory();

  const validateForm = (): void => {
    setIsFormValid(isUserNameValid && isPasswordValid && isRepeatPasswordValid);
  };

  const validateField = async (fieldName: string): Promise<void> => {
    const fieldValidationErrors = formErrors;
    let userNameValid = isUserNameValid;
    let passwordValid = isPasswordValid;
    let repeatPasswordValid = isRepeatPasswordValid;

    switch (fieldName) {
      case "userName":
        if (userName.length === 0) {
          userNameValid = false;
          fieldValidationErrors.userName = "is too short";
        } else if ((await apiAuth.isUserExists(userName)).status === 200) {
          userNameValid = false;
          fieldValidationErrors.userName = "user with such name already exists";
        } else {
          userNameValid = true;
          fieldValidationErrors.userName = "";
        }
        break;
      case "password":
        passwordValid = password
          .match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/i)
          ?.includes(password) as boolean;
        fieldValidationErrors.password = passwordValid ? "" : "incorrect password";
        break;
      case "repeatPassword":
        repeatPasswordValid = repeatPassword === repeatPassword.trim();
        fieldValidationErrors.password = passwordValid ? "" : "passwords doesn't match";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setIsUserNameValid(userNameValid);
    setIsPasswordValid(passwordValid);
    setIsRepeatPasswordValid(repeatPasswordValid);
    validateForm();
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value.trim());
    validateField("userName");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value.trim());
    validateField("password");
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRepeatPassword(event.target.value.trim());
    validateField("repeatPassword");
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    // event.preventDefault();
    const response = await apiAuth.signUp(userName, password);
    if (response.status === 201) {
      props.onSignUpButtonCloseClick(event);
      props.onSignIn(response.data);
      history.push(RouteItems.Profile.url);
    } else if (response.status === 400) {
      /* show mistakes */
    }
  };

  return (
    <Modal>
      <div className="modal">
        <FormErrors formErrors={formErrors} />
        <form className="modal__form">
          <FormErrors formErrors={formErrors} />
          <div>
            <h2>Sign Up</h2>
            <ButtonClose onClick={props.onSignUpButtonCloseClick} />
          </div>
          <InputText
            onChange={handleUserNameChange}
            type="text"
            placeholder="Name"
            label="Name"
            name="userName"
            value={userName}
          />
          <InputText
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
            value={password}
          />
          <InputText
            onChange={handleRepeatPasswordChange}
            type="password"
            placeholder="Password"
            label="Repeat password"
            name="repeatPassword"
            value={repeatPassword}
          />
          <ButtonSubmit onClick={handleButtonClick} isFormValid={isFormValid} />
        </form>
      </div>
    </Modal>
  );
}
