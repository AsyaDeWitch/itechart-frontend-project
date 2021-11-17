import Modal from "@/elements/modal";
import { ChangeEvent, useState } from "react";
import DeliveryAddressChanger from "./deliveryAddressChanger";
import PasswordChanger from "./passwordChanger";
import "./profile.scss";

export default function Profile(): JSX.Element {
  const [isShownPasswordChange, setIsShownPasswordChange] = useState(false);
  const [isShownAddressChange, setIsShownAddressChange] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChangePasswordButtonClick = () => {};
  const handlePasswordSubmitButtonClick = () => {};
  const handlePasswordCloseButtonClick = () => {};

  const handleSaveProfileButtonClick = () => {};

  const handleChangeAddressButtonClick = () => {};
  const handleAddressSubmitButtonClick = () => {};
  const handleAddressCloseButtonClick = () => {};

  const handleChangeImageButtonClick = () => {};

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="profile">
      <h2>Profile page</h2>
      <input type="file" onChange={handleFileSelect} accept="image/*" />
      {isShownPasswordChange ? (
        <Modal>
          <PasswordChanger onChangePasswordButtonCloseClick={handlePasswordCloseButtonClick} />
        </Modal>
      ) : null}
      {isShownAddressChange ? (
        <Modal>
          <DeliveryAddressChanger onChangeAddressButtonCloseClick={handleAddressCloseButtonClick} />
        </Modal>
      ) : null}
    </div>
  );
}
