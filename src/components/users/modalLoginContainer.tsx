import Modal from "@/elements/modal";
import { MouseEventHandler } from "react";
import Login from "./login";

export default function ModalLoginContainer(props: { onSignInButtonCloseClick: MouseEventHandler }): JSX.Element {
  return (
    <Modal>
      <Login onSignInButtonCloseClick={props.onSignInButtonCloseClick} />
    </Modal>
  );
}
