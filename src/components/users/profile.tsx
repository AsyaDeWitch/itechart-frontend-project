import Modal from "@/elements/modal";
import { ChangeEvent, useEffect, useState } from "react";
import * as apiProfile from "@/api/apiProfile";
import { StatusCodes } from "http-status-codes";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "@/redux/store";
import TProfile from "@/shared/types/profile";
import Address from "@/shared/types/address";
import ButtonUniversal from "@/elements/buttonUniversal";
import fromFileToBase64 from "@/helpers/base64FileConverter";
import { joiProfileSchema } from "@/helpers/formJoiSchema";
import { setSignInData } from "@/redux/slices/loggingSlice";
import User from "@/shared/types/user";
import nullImgFile from "@/assets/images/profile/no-profile-photo.png";
import PasswordChanger from "./passwordChanger";
import DeliveryAddressChanger from "./deliveryAddressChanger";
import ImageProfile from "./imageProfile";
import InputProfileText from "./inputProfileText";

const nullAddress: Address = {
  country: "",
  city: "",
  street: "",
  houseNumber: 0,
  houseBuilding: "",
  entranceNumber: 0,
  floorNumber: 0,
  flatNumber: 0,
};
const nullUserProfile: TProfile = {
  id: 0,
  name: "",
  email: "",
  defaultDeliveryAddress: nullAddress,
  image: "",
  description: "",
  phoneNumber: "",
};
const nullImageFile: File = new File([""], "");

export default function Profile(): JSX.Element {
  const [isShownPasswordChange, setIsShownPasswordChange] = useState(false);
  const [isShownAddressChange, setIsShownAddressChange] = useState(false);
  const [isShownImageFileInput, setIsShownImageFileInput] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [image64, setImage64] = useState(nullImgFile);
  const [userProfile, setUserProfile] = useState(nullUserProfile);
  const [selectedImage, setSelectedImage] = useState(nullImageFile);
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);
  let fileInputRef: HTMLInputElement | null;

  async function getUserProfile() {
    try {
      const response = await apiProfile.getProfile(signInUser.id);
      if (response.status === StatusCodes.OK) {
        setUserProfile(response.data);
        setUserName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setDescription(response.data.description);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const validateForm = (): void => {
    const { error } = joiProfileSchema.validate({ userName, description, email, phoneNumber });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  };

  const handleInputFocusChange = (): void => {
    validateForm();
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhoneNumber(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDescription(event.target.value);
  };

  const handleUserNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUserName(event.target.value);
  };

  const handleChangePasswordButtonClick = () => {
    setIsShownPasswordChange(true);
  };

  const handlePasswordCloseButtonClick = () => {
    setIsShownPasswordChange(false);
    getUserProfile();
  };

  const handleSaveProfileButtonClick = async () => {
    if (isFormValid) {
      try {
        const updatedUser: TProfile = {
          id: 0,
          name: userName,
          email,
          defaultDeliveryAddress: nullAddress,
          image: "",
          description,
          phoneNumber,
        };
        const response = await apiProfile.saveProfile(signInUser.id, updatedUser);
        if (response.status === StatusCodes.OK) {
          const updatedSignInUser: User = { id: signInUser.id, name: response.data.name };
          dispatch(setSignInData(updatedSignInUser));
        }
      } catch {
        setFormErrors("Something went wrong...");
      }
      getUserProfile();
    }
  };

  const handleChangeAddressButtonClick = () => {
    setIsShownAddressChange(true);
  };

  const handleAddressCloseButtonClick = () => {
    setIsShownAddressChange(false);
    getUserProfile();
  };

  const handleChangeImageButtonClick = () => {
    setIsShownImageFileInput(true);
  };

  const handleImageSubmitButtonClick = async () => {
    // change image
    const newImage64 = await fromFileToBase64(selectedImage);

    getUserProfile();
    if (image64 === newImage64) {
      setImage64(nullImgFile);
    } else {
      setImage64(newImage64);
    }
    setIsShownImageFileInput(false);
  };

  const handleImageCloseButtonClick = () => {
    setIsShownImageFileInput(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = (event: any) => {
    setSelectedImage(event.target.files[0]);
  };

  return (
    <div className="profile">
      <h2>{userProfile.name} profile page</h2>
      <hr />
      <div>
        <div>
          <ImageProfile image64={image64} />
          <ButtonUniversal buttonText="Save profile" onClick={handleSaveProfileButtonClick} />
          {isShownImageFileInput ? (
            <>
              <input
                style={{ display: "none" }}
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                ref={(fileInput) => {
                  fileInputRef = fileInput;
                }}
              />
              <ButtonUniversal buttonText="Choose image file" onClick={() => fileInputRef?.click()} />
              <ButtonUniversal buttonText="Save changes" onClick={handleImageSubmitButtonClick} />
              <ButtonUniversal buttonText="Skip changes" onClick={handleImageCloseButtonClick} />
            </>
          ) : (
            <ButtonUniversal buttonText="Change profile image" onClick={handleChangeImageButtonClick} />
          )}
        </div>

        <div>
          <div className="modal__error">{formErrors}</div>
          <InputProfileText
            type="text"
            placeholder="Name"
            label="Name"
            name="userName"
            onChange={handleUserNameChange}
            value={userName}
            onBlur={handleInputFocusChange}
          />
          <InputProfileText
            type="text"
            placeholder="Email"
            label="Email"
            name="email"
            onChange={handleEmailChange}
            value={email}
            onBlur={handleInputFocusChange}
          />
          <InputProfileText
            type="text"
            placeholder="Phone number"
            label="Phone number"
            name="phoneNumber"
            onChange={handlePhoneNumberChange}
            value={phoneNumber}
            onBlur={handleInputFocusChange}
          />
          <InputProfileText
            type="text"
            placeholder="Description"
            label="Profile description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            onBlur={handleInputFocusChange}
          />
        </div>

        <div>
          <ButtonUniversal buttonText="Change password" onClick={handleChangePasswordButtonClick} />
          <ButtonUniversal buttonText="Change address" onClick={handleChangeAddressButtonClick} />
        </div>
      </div>
      {isShownPasswordChange ? (
        <Modal>
          <PasswordChanger onChangePasswordButtonCloseClick={handlePasswordCloseButtonClick} />
        </Modal>
      ) : null}
      {isShownAddressChange ? (
        <Modal>
          <DeliveryAddressChanger
            onChangeAddressButtonCloseClick={handleAddressCloseButtonClick}
            oldAddress={userProfile.defaultDeliveryAddress}
          />
        </Modal>
      ) : null}
    </div>
  );
}
