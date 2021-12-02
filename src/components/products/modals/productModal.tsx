import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import { useState, MouseEvent, MouseEventHandler, useEffect } from "react";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import ProductItem from "@/shared/types/productItem";
import { joiProductShema } from "@/helpers/formJoiSchema";

const nullPlatforms: number[] = []; // string[]

export default function DeliveryAddressChanger(props: {
  onButtonCloseClick: MouseEventHandler;
  oldProduct: ProductItem | null;
}): JSX.Element {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [logo, setLogo] = useState("");
  const [dateCreated, setDateCreated] = useState("");
  const [totalRating, setTotalRating] = useState(0);
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState(nullPlatforms);
  const [genre, setGenre] = useState(0); // ""
  const [age, setAge] = useState(0); // ""
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  // type of modal - add or edit

  const validateForm = (): void => {
    const { error } = joiProductShema.validate({
      name,
      price,
      dateCreated,
      totalRating,
      description,
      logo,
    });
    if (error !== undefined && error.message !== undefined) {
      setFormErrors(error.message as string);
    } else {
      setIsFormValid(true);
      setFormErrors("");
    }
  };

  useEffect(() => {
    if (props.oldProduct !== null) {
      setName(props.oldProduct.name);
      setPrice(props.oldProduct.price);
      setLogo(props.oldProduct.logo);
      setDateCreated(props.oldProduct.dateCreated);
      setTotalRating(props.oldProduct.totalRating);
      setDescription(props.oldProduct.description);
      setPlatforms(props.oldProduct.platform);
      setGenre(props.oldProduct.genre);
      setAge(props.oldProduct.age);
    }
  }, []);

  const handleInputFocusChange = (): void => {
    validateForm();
  };

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
    if (isFormValid) {
      // try {
      /* const address: Address = {
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
      } */
    }
  };

  return (
    <div className="modal">
      <div className="modal__form">
        <nav className="modal__head">
          <div className="modal__title">Change default delivery address</div>
          <div className="modal__buttonClose">
            <ButtonClose onClick={props.onButtonCloseClick} />
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
        <div className="modal__buttonSubmit">
          <ButtonSubmit onClick={handleButtonClick} />
          {/* Button Submit and delete (if edit) or skip (if add) */}
        </div>
      </div>
    </div>
  );
}
