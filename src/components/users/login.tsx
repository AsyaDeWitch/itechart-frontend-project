import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
// import FormErrors from "@/elements/formErrors";
import ButtonClose from "@/elements/buttonClose";
import FormJoiSchema from "@/helpers/formJoiSchema";

export default function Login(props: {
  onSignIn(user: User): void;
  onSignInButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  // const [isUserNameValid, setIsUserNameValid] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (): void => {
    const { error } = FormJoiSchema.validate({ userName, password });
    if (typeof error === undefined) {
      setIsFormValid(true);
    } else {
      setFormErrors(error?.message as string);
    }
  };

  /* const validateField = async (fieldName: string): Promise<void> => {
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
  }; */

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
    // validateForm();
    // validateField("userName");
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    // validateForm();
    // validateField("password");
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      const response = await apiAuth.signIn(userName, password);
      alert(isFormValid);
      if (response.status === 201) {
        alert("ok");
        props.onSignIn(response.data);
        props.onSignInButtonCloseClick(event);
      } else if (response.status === 400) {
        /* show mistakes */
        alert("mistake");
      }
      console.log(response.status);
    }
  };

  return (
    <Modal>
      <div className="modal">
        {/* <div>{formErrors}</div>*/}
        <div className="modal__form">
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
          <ButtonSubmit onClick={handleButtonClick} />
        </div>
      </div>
    </Modal>
  );
}
