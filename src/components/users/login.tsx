import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import FormJoiSchema from "@/helpers/formJoiSchema";

export default function Login(props: {
  onSignIn(user: User): void;
  onSignInButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = (): void => {
    const { error } = FormJoiSchema.validate({ userName, password });
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

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
    console.log(userName);
    validateForm();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    validateForm();
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      const response = await apiAuth.signIn(userName, password);
      if (response.status === 201) {
        props.onSignIn(response.data);
        props.onSignInButtonCloseClick(event);
      } else if (response.status === 400) {
        setFormErrors("Invalid user name or password");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <div>
          <h2>Sign In</h2>
          <ButtonClose onClick={props.onSignInButtonCloseClick} />
          <div>{formErrors}</div>
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
  );
}
