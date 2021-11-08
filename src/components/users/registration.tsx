import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import Modal from "@/elements/modal";
import * as apiAuth from "@/api/apiAuth";
import { ChangeEvent, useState, MouseEvent } from "react";

export default function Registration(): JSX.Element {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

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
    /* send request*/
    event.preventDefault();
    /* validators */
    console.log(repeatPassword);
    const responce = await apiAuth.signUp(userName, password);
    if (responce.status === 201) {
      /* close modal, call function in MainApp*/
      /* return user model */
    } else if (responce.status === 400) {
      /* show mistakes */
    }
  };

  return (
    <Modal>
      <form>
        <h2>Sign Up</h2>
        <InputText onChange={handleUserNameChange} type="text" placeholder="Name" label="Name" />
        <InputText onChange={handlePasswordChange} type="password" placeholder="Password" label="Password" />
        <InputText
          onChange={handleRepeatPasswordChange}
          type="password"
          placeholder="Password"
          label="Repeat password"
        />
        <ButtonSubmit onClick={handleButtonClick} />
      </form>
    </Modal>
  );
}
