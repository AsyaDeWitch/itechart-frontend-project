import ButtonSubmit from "@/elements/buttonSubmit";
import InputText from "@/elements/inputText";
import { useState, MouseEvent, MouseEventHandler, useEffect, useMemo, ChangeEvent } from "react";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose";
import ProductItem from "@/shared/types/productItem";
import { joiProductShema } from "@/helpers/formJoiSchema";
import CategoryItem from "@/shared/categories/categoryItem";
import Categories from "@/shared/categories/gameCategories";
import Ages from "@/mockData/ages.json";
import CheckCategoryItem from "../elements/checkCategoryItem";
import InputNumberText from "../elements/inputNumberText";
import InputDate from "../elements/inputDate";
import DescriptionTextArea from "../elements/descriptionTextArea";
import GenreSelect from "../elements/genreSelect";
import AgeSelect from "../elements/ageSelect";

const nullPlatforms: number[] = []; // string[]

export default function ProductModal(props: {
  onButtonCloseClick: MouseEventHandler;
  oldProduct: ProductItem | null;
}): JSX.Element {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [logo, setLogo] = useState("");
  // const [dateCreated, setDateCreated] = useState("");
  const [dateCreated, setDateCreated] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [description, setDescription] = useState("");
  const [platforms, setPlatforms] = useState(nullPlatforms);
  const [genre, setGenre] = useState("");
  const genreId = useMemo(() => (Categories.find((category) => category.name === genre) || Categories[0]).id, [genre]);
  const [age, setAge] = useState("");
  const ageId = useMemo(() => (Ages.find((item) => item.name === age) || Ages[0]).id, [age]);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [isAddModal, setIsAddModal] = useState(false);

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
      // setDateCreated(props.oldProduct.dateCreated);
      setDateCreated(Number(props.oldProduct.dateCreated));
      setTotalRating(props.oldProduct.totalRating);
      setDescription(props.oldProduct.description);
      setPlatforms(props.oldProduct.platform);
      setGenre((Categories.find((category) => category.id === props.oldProduct?.genre) || Categories[0]).name);
      setAge((Ages.find((item) => item.id === props.oldProduct?.age) || Ages[0]).name);
    } else {
      setIsAddModal(true);
    }
  }, []);

  const handleInputFocusChange = (): void => {
    validateForm();
  };

  const handleSubmitButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
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
      props.onButtonCloseClick(event);
    }
  };

  const handleCheckedItemsUpdate = (categoryId: number, checked: boolean) => {
    validateForm();
    if (checked) {
      const newPlatforms = [...platforms, categoryId];
      setPlatforms(newPlatforms);
    } else {
      setPlatforms(platforms.filter((platformId) => platformId !== categoryId));
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(event.target.value));
  };

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLogo(event.target.value);
  };

  const handleDateCreatedChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setDateCreated(event.target.value);
    setDateCreated(Number(event.target.value));
  };

  const handleTotalRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTotalRating(Number(event.target.value));
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };
  const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };
  const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setAge(event.target.value);
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
        <div>
          <img src={logo} alt="game-image" />
        </div>
        <div>
          <div className="modal__error">{formErrors}</div>
          <div className="modal__small-input">
            <InputText
              onChange={handleNameChange}
              type="text"
              placeholder="Name"
              label="Name"
              name="name"
              value={name}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-input">
            <InputNumberText
              onChange={handlePriceChange}
              label="Price"
              name="price"
              value={price}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-input">
            <InputText
              onChange={handleLogoChange}
              type="text"
              placeholder="Image URL"
              label="Image URL"
              name="logo"
              value={logo}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-input">
            <InputDate
              onChange={handleDateCreatedChange}
              label="Creation date"
              name="dateCreated"
              value={dateCreated}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-input">
            <InputNumberText
              onChange={handleTotalRatingChange}
              label="Rating"
              name="totalRating"
              value={totalRating}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-textarea">
            <DescriptionTextArea
              onChange={handleDescriptionChange}
              placeholder="Description"
              label="Description"
              name="description"
              value={description}
              onBlur={handleInputFocusChange}
            />
          </div>
          <div className="modal__small-select">
            <GenreSelect onChange={handleGenreChange} label="Genre" value={genre} />
          </div>
          <div className="modal__small-select">
            <AgeSelect onChange={handleAgeChange} label="Age" value={age} />
          </div>
          <div>
            {Categories.map((category: CategoryItem) => (
              <CheckCategoryItem onCheckedItemsUpdate={handleCheckedItemsUpdate} categoryItem={category} />
            ))}
          </div>
        </div>

        <div className="modal__buttonSubmit">
          <ButtonSubmit onClick={handleSubmitButtonClick} />
          {/* Button Submit and delete (if edit) or skip (if add) */}
        </div>
      </div>
    </div>
  );
}
