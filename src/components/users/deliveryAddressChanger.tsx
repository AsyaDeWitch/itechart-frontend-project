import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import * as apiProfile from "@/api/apiProfile";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler } from "react";
import "../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import { joiAddressSchema } from "@/helpers/formJoiSchema";
import { StatusCodes } from "http-status-codes";
import { useSelector } from "react-redux";
import { TStore } from "@/redux/store";
import Address from "@/shared/types/address";

export default function DeliveryAddressChanger(props: {
  onChangeAddressButtonCloseClick: MouseEventHandler;
}): JSX.Element {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [houseBuilding, setHouseBuilding] = useState("");
  const [entranceNumber, setEntranceNumber] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [flatNumber, setFlatNumber] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const { signInUser } = useSelector((state: TStore) => state.reducer.loggingReducer);

  const validateForm = (): void => {
    const { error } = joiAddressSchema.validate({
      country,
      city,
      street,
      houseNumber,
      houseBuilding,
      entranceNumber,
      floorNumber,
      flatNumber,
    });
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

  const handleCountryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCountry(event.target.value);
  };

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCity(event.target.value);
  };

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setStreet(event.target.value);
  };
  const handleHouseNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setHouseNumber(event.target.value);
  };
  const handleHouseBuildingChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setHouseBuilding(event.target.value);
  };
  const handleEntranceNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEntranceNumber(event.target.value);
  };
  const handleFloorNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFloorNumber(event.target.value);
  };
  const handleFlatNumberChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFlatNumber(event.target.value);
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      try {
        const address: Address = {
          country,
          city,
          street,
          houseNumber: Number(houseNumber),
          houseBuilding,
          entranceNumber: Number(entranceNumber),
          floorNumber: Number(floorNumber),
          flatNumber: Number(flatNumber),
        };
        const response = await apiProfile.changeDefaultDeliveryAddress(signInUser.id, address);
        if (response.status === StatusCodes.OK) {
          props.onChangeAddressButtonCloseClick(event);
        }
      } catch (error) {
        setFormErrors("Something went wrong while changing password");
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Change default delivery address</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onChangeAddressButtonCloseClick} />
          </div>
        </nav>
        <div className="modal__error">{formErrors}</div>
        <div className="modal__input">
          <InputText
            onChange={handleCountryChange}
            type="text"
            placeholder="Country"
            label="Country"
            name="country"
            value={country}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleCityChange}
            type="text"
            placeholder="City"
            label="City"
            name="city"
            value={city}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleStreetChange}
            type="text"
            placeholder="Street"
            label="Street"
            name="street"
            value={street}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleHouseNumberChange}
            type="text"
            placeholder="HouseNumber"
            label="HouseNumber"
            name="houseNumber"
            value={houseNumber}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleHouseBuildingChange}
            type="text"
            placeholder="HouseBuilding"
            label="HouseBuilding"
            name="houseBuilding"
            value={houseBuilding}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleEntranceNumberChange}
            type="text"
            placeholder="EntranceNumber"
            label="EntranceNumber"
            name="entranceNumber"
            value={entranceNumber}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleFloorNumberChange}
            type="text"
            placeholder="FloorNumber"
            label="FloorNumber"
            name="floorNumber"
            value={floorNumber}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__input">
          <InputText
            onChange={handleFlatNumberChange}
            type="text"
            placeholder="FlatNumber"
            label="FlatNumber"
            name="flatNumber"
            value={flatNumber}
            onBlur={handleInputFocusChange}
          />
        </div>
        <div className="modal__buttonSubmit">
          <ButtonSubmit onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}
