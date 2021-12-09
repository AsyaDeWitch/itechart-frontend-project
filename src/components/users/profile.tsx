import Modal from "@/elements/modal";
import { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import * as apiProfile from "@/api/apiProfile";
import { StatusCodes } from "http-status-codes";
import "./profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { TStore } from "@/redux/store";
import TProfile from "@/shared/types/profile";
import Address from "@/shared/types/address";
import ButtonUniversal from "@/elements/buttonUniversal/buttonUniversal";
import fromFileToBase64 from "@/helpers/base64FileConverter";
import { joiProfileSchema } from "@/helpers/formJoiSchema";
import { setSignInData } from "@/redux/slices/loggingSlice";
import User from "@/shared/types/user";
import nullImgFile from "images/profile/no-profile-photo.png";
import PasswordChanger from "./modals/passwordChanger";
import DeliveryAddressChanger from "./modals/deliveryAddressChanger";
import ImageProfile from "./elements/imageProfile/imageProfile";
import InputProfileText from "./elements/inputProfileText/inputProfileText";
import TextareaProfileDescription from "./elements/textareaProfileDescription/textareaProfileDescription";

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
  image: nullImgFile,
  description: "",
  phoneNumber: "",
  balance: 0,
  role: "",
};

const MemoizedProfile = memo((): JSX.Element => {
  const [isShownPasswordChange, setIsShownPasswordChange] = useState(false);
  const [isShownAddressChange, setIsShownAddressChange] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [balance, setBalance] = useState(0);
  const [description, setDescription] = useState("");
  const [image64, setImage64] = useState(nullImgFile);
  const [selectedImage, setSelectedImage] = useState("");
  const [isClearedImage, setIsClearedImage] = useState(false);
  const [userProfile, setUserProfile] = useState(nullUserProfile);
  const [formErrors, setFormErrors] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
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
        setBalance(response.data.balance);
        setDescription(response.data.description);
        if (response.data.image !== "") {
          setImage64(response.data.image);
        } else {
          setImage64(nullImgFile);
          setIsClearedImage(true);
        }
      }
    } catch (error) {
      setFormErrors("Something went wrong...");
    }
  }

  useEffect(() => {
    getUserProfile();
  }, []);

  const memoizedValidateForm = useCallback((): void => {
    const { error } = joiProfileSchema.validate({
      userName,
      description,
      email,
      phoneNumber,
      balance,
    });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
    setFormSuccess("");
  }, [userName, description, email, phoneNumber, balance]);

  const memoizedInputFocusChangeHandler = useCallback(() => {
    memoizedValidateForm();
  }, [userName, description, email, phoneNumber, balance]);

  const memoizedEmailChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setEmail(event.target.value);
    },
    [email]
  );

  const memoizedPhoneNumberChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setPhoneNumber(event.target.value);
    },
    [phoneNumber]
  );

  const memoizedDescriptionChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>): void => {
      setDescription(event.target.value);
    },
    [description]
  );

  const memoizedUserNameChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setUserName(event.target.value);
    },
    [userName]
  );

  const memoizedBalanceChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setBalance(Number(event.target.value));
    },
    [balance]
  );

  const memoizedChangePasswordButtonClickHandler = useCallback((): void => {
    setIsShownPasswordChange(true);
  }, []);

  const handlePasswordCloseButtonClick = () => {
    setIsShownPasswordChange(false);
    getUserProfile();
  };

  const handleSaveProfileButtonClick = async () => {
    memoizedValidateForm();
    if (isFormValid) {
      try {
        const updatedUser: TProfile = {
          id: signInUser.id,
          name: userName,
          email,
          defaultDeliveryAddress: nullAddress,
          image: isClearedImage ? "" : image64,
          description,
          phoneNumber,
          balance: Number(balance),
          role: signInUser.role,
        };
        const response = await apiProfile.saveProfile(updatedUser);
        if (response.status === StatusCodes.OK) {
          const updatedSignInUser: User = { id: signInUser.id, name: response.data.name, role: signInUser.role };
          dispatch(setSignInData(updatedSignInUser));
          getUserProfile();
          setFormSuccess("Changes successfully saved!");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message.includes("413")) {
          setFormErrors("Image is too large. Try to choose another");
        } else if (error.message.includes("409")) {
          setFormErrors("User with such name already exists");
        } else {
          setFormErrors("Something went wrong while changing profile information...");
        }
      }
      setSelectedImage("");
    }
  };

  const handleSkipChangesButtonClick = () => {
    getUserProfile();
    setSelectedImage("");
  };

  const memoizedChangeAddressButtonClickHandler = useCallback((): void => {
    setIsShownAddressChange(true);
  }, []);

  const handleAddressCloseButtonClick = () => {
    setIsShownAddressChange(false);
    getUserProfile();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFileSelect = async (event: any) => {
    memoizedValidateForm();
    setSelectedImage(event.target.value);
    setImage64(await fromFileToBase64(event.target.files[0]));
    setIsClearedImage(false);
  };

  const memoizedDeleteProfileImageButtonClickHandler = useCallback((): void => {
    memoizedValidateForm();
    setImage64(nullImgFile);
    setSelectedImage("");
    setIsClearedImage(true);
  }, [userName, description, email, phoneNumber, balance]);

  return (
    <div className="profile">
      <h2 className="profile__title">{userProfile.name} profile page</h2>
      <hr />
      <div className="profile__area">
        <div className="profile__area__image">
          <ImageProfile image64={image64} />
          <input
            style={{ display: "none" }}
            type="file"
            onChange={handleFileSelect}
            value={selectedImage}
            accept="image/*"
            ref={(fileInput) => {
              fileInputRef = fileInput;
            }}
          />
          <ButtonUniversal buttonText="Change profile image" onClick={() => fileInputRef?.click()} />
          <ButtonUniversal buttonText="Delete profile image" onClick={memoizedDeleteProfileImageButtonClickHandler} />
        </div>

        <div className="profile__area__inputs">
          <div className="profile__area__inputs__error">{formErrors}</div>
          <div className="profile__area__inputs__success">{formSuccess}</div>
          <InputProfileText
            type="text"
            placeholder="Name"
            label="Name"
            name="userName"
            onChange={memoizedUserNameChangeHandler}
            value={userName}
            onBlur={memoizedInputFocusChangeHandler}
          />
          <InputProfileText
            type="text"
            placeholder="Email"
            label="Email"
            name="email"
            onChange={memoizedEmailChangeHandler}
            value={email}
            onBlur={memoizedInputFocusChangeHandler}
          />
          <InputProfileText
            type="text"
            placeholder="Phone number"
            label="Phone number"
            name="phoneNumber"
            onChange={memoizedPhoneNumberChangeHandler}
            value={phoneNumber}
            onBlur={memoizedInputFocusChangeHandler}
          />
          <InputProfileText
            type="number"
            placeholder="Balance"
            label="Balance"
            name="balance"
            onChange={memoizedBalanceChangeHandler}
            value={balance}
            onBlur={memoizedInputFocusChangeHandler}
          />
          <TextareaProfileDescription
            placeholder="Description"
            label="Profile description"
            name="description"
            onChange={memoizedDescriptionChangeHandler}
            value={description}
            onBlur={memoizedInputFocusChangeHandler}
          />
        </div>

        <div className="profile__area__buttons">
          <ButtonUniversal buttonText="Save profile" onClick={handleSaveProfileButtonClick} />
          <ButtonUniversal buttonText="Skip changes" onClick={handleSkipChangesButtonClick} />
          <hr className="profile__area__image__line" />
          <ButtonUniversal buttonText="Change password" onClick={memoizedChangePasswordButtonClickHandler} />
          <ButtonUniversal buttonText="Change address" onClick={memoizedChangeAddressButtonClickHandler} />
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
});

MemoizedProfile.displayName = "Profile";

export default MemoizedProfile;
