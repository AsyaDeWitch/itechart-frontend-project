import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent } from "react";

export default function Login(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  // const [formErrors, setFormErrors] = useState({ userName: "", password: "" });
  // const [isUserNameValid, setIsUserNameValid] = useState(false);
  // const [isPasswordValid, setIsPasswordValid] = useState(false);
  // const [isFormValid, setIsFormValid] = useState(false);

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    /* send request*/
    event.preventDefault();
    /* validators */
    const responce = await apiAuth.signIn(userName, password);
    if (responce.status === 201) {
      /* close modal, call function in MainApp*/
    } else if (responce.status === 400) {
      /* show mistakes */
    }
  };

  return (
    <Modal>
      <form>
        <h2>Sign In</h2>
        <InputText onChange={handleUserNameChange} type="text" placeholder="Name" label="Name" />
        <InputText onChange={handlePasswordChange} type="password" placeholder="Password" label="Password" />
        <ButtonSubmit onClick={handleButtonClick} />
      </form>
    </Modal>
  );
}
