import Modal from "@/elements/modal";
import { MouseEventHandler } from "react";
import Registration from "./registration";

export default function ModalLoginContainer(props: { onSignUpButtonCloseClick: MouseEventHandler }): JSX.Element {
  return (
    <Modal>
      <Registration onSignUpButtonCloseClick={props.onSignUpButtonCloseClick} />
    </Modal>
  );
}
