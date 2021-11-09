import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
import FormErrors from "@/elements/formErrors";
import ButtonClose from "@/elements/buttonClose";

export default function Login(props: {
  onSignIn(user: User): void;
  onSignInButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({ userName: "", password: "" });
  const [isUserNameValid, setIsUserNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (): void => {
    setIsFormValid(isUserNameValid && isPasswordValid);
  };

  const validateField = async (fieldName: string): Promise<void> => {
    const fieldValidationErrors = formErrors;
    let userNameValid = isUserNameValid;
    let passwordValid = isPasswordValid;

    switch (fieldName) {
      case "userName":
        if ((await apiAuth.isUserExists(userName)).status === 400) {
          userNameValid = false;
          fieldValidationErrors.userName = "user with such name doesn't exists";
        } else {
          userNameValid = true;
          fieldValidationErrors.userName = "";
        }
        break;
      case "password":
        passwordValid = (await apiAuth.isUserWithSuchPasswordExists(userName, password)).status === 200;
        fieldValidationErrors.password = passwordValid ? "" : "incorrect password";
        break;
      default:
        break;
    }
    setFormErrors(fieldValidationErrors);
    setIsUserNameValid(userNameValid);
    setIsPasswordValid(passwordValid);
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

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    // event.preventDefault();
    const response = await apiAuth.signIn(userName, password);
    if (response.status === 201) {
      props.onSignInButtonCloseClick(event);
      props.onSignIn(response.data);
    } else if (response.status === 400) {
      /* show mistakes */
    }
  };

  return (
    <Modal>
      <div className="modal">
        <FormErrors formErrors={formErrors} />
        <form className="modal__form">
          <div>
            <h2>Sign In</h2>
            <ButtonClose onClick={props.onSignInButtonCloseClick} />
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
          <ButtonSubmit onClick={handleButtonClick} isFormValid={isFormValid} />
        </form>
      </div>
    </Modal>
  );
}
