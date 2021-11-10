import Modal from "@/elements/modal";
import User from "@/shared/types/user";
import { MouseEventHandler } from "react";
import Login from "./login";

export default function ModalLoginContainer(props: {
  onSignIn(user: User): void;
  onSignInButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  return (
    <Modal>
      <Login onSignIn={props.onSignIn} onSignInButtonCloseClick={props.onSignInButtonCloseClick} />
    </Modal>
  );
}
