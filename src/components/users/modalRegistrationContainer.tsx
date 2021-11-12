import Modal from "@/elements/modal";
import User from "@/shared/types/user";
import { MouseEventHandler } from "react";
import Registration from "./registration";

export default function ModalLoginContainer(props: {
  onSignIn(user: User): void;
  onSignUpButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  return (
    <Modal>
      <Registration onSignIn={props.onSignIn} onSignUpButtonCloseClick={props.onSignUpButtonCloseClick} />
    </Modal>
  );
}
