import { StatusCodes } from "http-status-codes";
import { useSelector } from "react-redux";
import { ChangeEvent, useState, MouseEvent, MouseEventHandler, useEffect, useCallback, memo } from "react";
import ButtonSubmit from "@/elements/buttonSubmit/buttonSubmit";
import InputText from "@/elements/inputText/inputText";
import * as apiProfile from "@/api/apiProfile";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose/buttonClose";
import { joiAddressSchema } from "@/helpers/formJoiSchema";

import { TStore } from "@/redux/store";
import Address from "@/shared/types/address";

const MemoizedDeliveryAddressChanger = memo(
  (props: { onChangeAddressButtonCloseClick: MouseEventHandler; oldAddress: Address }): JSX.Element => {
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

    const memoizedValidateForm = useCallback((): void => {
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
    }, [country, city, street, houseNumber, houseBuilding, entranceNumber, floorNumber, flatNumber]);

    useEffect(() => {
      setCountry(props.oldAddress.country);
      setCity(props.oldAddress.city);
      setStreet(props.oldAddress.street);
      setHouseNumber(props.oldAddress.houseNumber.toString());
      setHouseBuilding(props.oldAddress.houseBuilding);
      setEntranceNumber(props.oldAddress.entranceNumber.toString());
      setFloorNumber(props.oldAddress.floorNumber.toString());
      setFlatNumber(props.oldAddress.flatNumber.toString());
    }, []);

    const memoizedInputFocusChangeHandler = useCallback(() => {
      memoizedValidateForm();
    }, [country, city, street, houseNumber, houseBuilding, entranceNumber, floorNumber, flatNumber]);

    const memoizedCountryChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
      },
      [country]
    );

    const memoizedCityChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
      },
      [city]
    );

    const memoizedStreetChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setStreet(event.target.value);
      },
      [street]
    );

    const memoizedHouseNumberChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setHouseNumber(event.target.value);
      },
      [houseNumber]
    );

    const memoizedHouseBuildingChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setHouseBuilding(event.target.value);
      },
      [houseBuilding]
    );

    const memoizedEntranceNumberChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setEntranceNumber(event.target.value);
      },
      [entranceNumber]
    );

    const memoizedFloorNumberChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setFloorNumber(event.target.value);
      },
      [floorNumber]
    );

    const memoizedFlatNumberChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setFlatNumber(event.target.value);
      },
      [flatNumber]
    );

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
          setFormErrors("Something went wrong while changing delivery address...");
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
              onChange={memoizedCountryChangeHandler}
              type="text"
              placeholder="Country"
              label="Country"
              name="country"
              value={country}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedCityChangeHandler}
              type="text"
              placeholder="City"
              label="City"
              name="city"
              value={city}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedStreetChangeHandler}
              type="text"
              placeholder="Street"
              label="Street"
              name="street"
              value={street}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedHouseNumberChangeHandler}
              type="text"
              placeholder="HouseNumber"
              label="HouseNumber"
              name="houseNumber"
              value={houseNumber}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedHouseBuildingChangeHandler}
              type="text"
              placeholder="HouseBuilding"
              label="HouseBuilding"
              name="houseBuilding"
              value={houseBuilding}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedEntranceNumberChangeHandler}
              type="text"
              placeholder="EntranceNumber"
              label="EntranceNumber"
              name="entranceNumber"
              value={entranceNumber}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedFloorNumberChangeHandler}
              type="text"
              placeholder="FloorNumber"
              label="FloorNumber"
              name="floorNumber"
              value={floorNumber}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__input">
            <InputText
              onChange={memoizedFlatNumberChangeHandler}
              type="text"
              placeholder="FlatNumber"
              label="FlatNumber"
              name="flatNumber"
              value={flatNumber}
              onBlur={memoizedInputFocusChangeHandler}
            />
          </div>
          <div className="modal__buttonSubmit">
            <ButtonSubmit onClick={handleButtonClick} />
          </div>
        </div>
      </div>
    );
  }
);

MemoizedDeliveryAddressChanger.displayName = "DeliveryAddressChanger";

export default MemoizedDeliveryAddressChanger;
