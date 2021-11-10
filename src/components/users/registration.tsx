import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
// import FormErrors from "@/elements/formErrors";
import RouteItems from "@/shared/routes/items/routeItems";
import { useHistory } from "react-router-dom";
import User from "@/shared/types/user";
import "../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import FormJoiSchema from "@/helpers/formJoiSchema";

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
    const { error } = FormJoiSchema.validate({ userName, password });
    if (typeof error === undefined) {
      setIsFormValid(true);
    } else {
      setFormErrors(error?.message as string);
    }
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value.trim());
    validateForm();
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value.trim());
    validateForm();
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRepeatPassword(event.target.value.trim());
    validateForm();
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      const response = await apiAuth.signUp(userName, password);
      if (response.status === 201) {
        props.onSignUpButtonCloseClick(event);
        props.onSignIn(response.data);
        history.push(RouteItems.Profile.url);
      } else if (response.status === 400) {
        /* show mistakes */
      }
    }
  };

  return (
    <Modal>
      <div className="modal">
        <form className="modal__form">
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
          <ButtonSubmit onClick={handleButtonClick} />
        </form>
      </div>
    </Modal>
  );
}
