import { useState, MouseEvent, MouseEventHandler, useEffect, useMemo, ChangeEvent, useCallback, memo } from "react";
import { StatusCodes } from "http-status-codes";
import { useDispatch } from "react-redux";
import ButtonSubmit from "@/elements/buttonSubmit/buttonSubmit";
import InputText from "@/elements/inputText/inputText";
import "../../../elements/modal.scss";
import ButtonClose from "@/elements/buttonClose/buttonClose";
import ProductItem from "@/shared/types/productItem";
import { joiProductShema } from "@/helpers/formJoiSchema";
import Ages from "@/mockData/ages.json";
import Genres from "@/mockData/genres.json";
import Modal from "@/elements/modal";
import * as apiProducts from "@/api/apiProducts";
import { setIsNeedToUpdate } from "@/redux/slices/productsSlice";
import InputNumberText from "../elements/inputNumberText/inputNumberText";
import InputDate from "../elements/inputDate/inputDate";
import DescriptionTextArea from "../elements/descriptionTextArea/descriptionTextArea";
import UniversalSelect from "../elements/universalSelect/universalSelect";
import ProductModalButton from "../elements/productModalButton";
import ConfirmationModal from "./confirmationModal";
import CheckCategoryItems from "../elements/checkCategoryItem/checkCategoryItems";
import GenreItem from "@/shared/games/genreItem";

const nullPlatforms: number[] = [];
const nullImage = "https://www.freeiconspng.com/uploads/no-image-icon-6.png";
const defaultNewProductId = 0;

const MemoizedProductModal = memo(
  (props: { onButtonCloseClick: MouseEventHandler; oldProduct: ProductItem | null }): JSX.Element => {
    const getGenreId = (genreName: string): number =>
      (Genres.find((item: GenreItem) => item.name === genreName) || Genres[0]).id;

    const getAgeId = (ageName: string): number => (Ages.find((item) => item.name === ageName) || Ages[0]).id;

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [logo, setLogo] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [totalRating, setTotalRating] = useState(0);
    const [description, setDescription] = useState("");
    const [platforms, setPlatforms] = useState(nullPlatforms);
    const [genre, setGenre] = useState("");
    const genreId = useMemo(() => getGenreId(genre), [genre]);
    const [age, setAge] = useState("");
    const ageId = useMemo(() => getAgeId(age), [age]);
    const [isFormValid, setIsFormValid] = useState(false);
    const [formErrors, setFormErrors] = useState("");
    const [isAddModal, setIsAddModal] = useState(false);
    const [isShownConfirmation, setIsShownConfirmation] = useState(false);
    const dispatch = useDispatch();

    const memoizedValidateForm = useCallback((): void => {
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
    }, [name, price, dateCreated, totalRating, description, logo]);

    const memoizedGetGenreId = useCallback(
      (): string => (Genres.find((item: GenreItem) => item.id === props.oldProduct?.genre) || Genres[0]).description,
      [Genres, props.oldProduct]
    );

    const memoizedGetAgeId = useCallback(
      (): string => (Ages.find((item) => item.id === props.oldProduct?.age) || Ages[0]).name,
      [Genres, props.oldProduct]
    );

    useEffect(() => {
      if (props.oldProduct !== null) {
        setName(props.oldProduct.name);
        setPrice(props.oldProduct.price);
        setLogo(props.oldProduct.logo);
        setDateCreated(new Date(props.oldProduct.dateCreated).toISOString().slice(0, 10));
        setTotalRating(props.oldProduct.totalRating);
        setDescription(props.oldProduct.description);
        setPlatforms(props.oldProduct.platform);
        setGenre(memoizedGetGenreId());
        setAge(memoizedGetAgeId());
      } else {
        setIsAddModal(true);
      }
    }, []);

    const memoizedGetGenreSelectOptions = useCallback((): string[] => Genres.map((item) => item.description), [Genres]);
    const memoizedGetAgeSelectOptions = useCallback((): string[] => Ages.map((item) => item.name), [Ages]);

    const memoizedInputFocusChangeHandler = useCallback(() => {
      memoizedValidateForm();
    }, [name, price, dateCreated, totalRating, description, logo]);

    const handleSubmitButtonClick = async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      if (isFormValid) {
        const product: ProductItem = {
          id: props.oldProduct?.id || defaultNewProductId,
          name,
          platform: platforms,
          dateCreated: new Date(dateCreated).toISOString(),
          totalRating,
          genre: genreId,
          age: ageId,
          logo,
          price,
          description,
        };
        if (isAddModal) {
          // create card
          try {
            const response = await apiProducts.AddNewProduct(product);
            if (response.status === StatusCodes.CREATED) {
              dispatch(setIsNeedToUpdate());
              props.onButtonCloseClick(event);
            }
          } catch {
            setFormErrors("Something went wrong while adding card...");
          }
        } else {
          // edit card
          try {
            const response = await apiProducts.EditProduct(product);
            if (response.status === StatusCodes.OK) {
              dispatch(setIsNeedToUpdate());
              props.onButtonCloseClick(event);
            }
          } catch (error) {
            setFormErrors("Something went wrong while editing card...");
          }
        }
      }
    };

    const memoizedCheckedItemsUpdateHandler = useCallback(
      (categoryId: number, checked: boolean) => {
        memoizedValidateForm();
        if (checked) {
          const newPlatforms = [...platforms, categoryId];
          setPlatforms(newPlatforms);
        } else {
          setPlatforms(platforms.filter((platformId) => platformId !== categoryId));
        }
      },
      [platforms]
    );

    const memoizedNameChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      },
      [name]
    );

    const memoizedPriceChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(Number(event.target.value));
      },
      [price]
    );

    const memoizedLogoChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setLogo(event.target.value);
      },
      [logo]
    );

    const memoizedDateCreatedChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setDateCreated(event.target.value);
      },
      [dateCreated]
    );

    const memoizedTotalRatingChangeHandler = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        setTotalRating(Number(event.target.value));
      },
      [totalRating]
    );

    const memoizedDescriptionChangeHandler = useCallback(
      (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
      },
      [description]
    );

    const memoizedGenreChangeHandler = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        setGenre(event.target.value);
      },
      [genre]
    );

    const memoizedAgeChangeHandler = useCallback(
      (event: ChangeEvent<HTMLSelectElement>) => {
        setAge(event.target.value);
      },
      [age]
    );

    const memoizedRemoveButtonCloseClickHandler = useCallback(() => {
      setIsShownConfirmation(false);
    }, []);

    const memoizedButtonDeleteClickHandler = useCallback(() => {
      setIsShownConfirmation(true);
    }, []);

    const memoizedButtonYesClickHandler = useCallback(
      (event: MouseEvent<HTMLButtonElement>): void => {
        setIsShownConfirmation(false);
        props.onButtonCloseClick(event);
      },
      [props.onButtonCloseClick]
    );

    return (
      <>
        <div className="modal">
          <div className="modal__form">
            <nav className="modal__head">
              <div className="modal__title">{isAddModal ? "Create card" : "Edit card"}</div>
              <div className="modal__buttonClose">
                <ButtonClose onClick={props.onButtonCloseClick} />
              </div>
            </nav>
            <div className="modal__form__flex">
              <div className="modal__form__image-holder">
                <img className="modal__form__card-image" src={logo === "" ? nullImage : logo} alt="game-card" />
              </div>
              <div className="modal__form__inputs-panel">
                <div className="modal__error">{formErrors}</div>
                <div className="modal__small-input">
                  <InputText
                    onChange={memoizedNameChangeHandler}
                    type="text"
                    placeholder="Name"
                    label="Name"
                    name="name"
                    value={name}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-input">
                  <InputText
                    onChange={memoizedLogoChangeHandler}
                    type="text"
                    placeholder="Image URL"
                    label="Image URL"
                    name="logo"
                    value={logo}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-textarea">
                  <DescriptionTextArea
                    onChange={memoizedDescriptionChangeHandler}
                    placeholder="Description"
                    label="Description"
                    name="description"
                    value={description}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-input">
                  <InputNumberText
                    onChange={memoizedPriceChangeHandler}
                    label="Price"
                    name="price"
                    value={price}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-input">
                  <InputNumberText
                    onChange={memoizedTotalRatingChangeHandler}
                    label="Rating"
                    name="totalRating"
                    value={totalRating}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-input">
                  <InputDate
                    onChange={memoizedDateCreatedChangeHandler}
                    label="Creation date"
                    name="dateCreated"
                    value={dateCreated}
                    onBlur={memoizedInputFocusChangeHandler}
                  />
                </div>
                <div className="modal__small-select">
                  <UniversalSelect
                    onChange={memoizedGenreChangeHandler}
                    label="Genre"
                    value={genre}
                    selectOptions={memoizedGetGenreSelectOptions()}
                  />
                </div>
                <div className="modal__small-select">
                  <UniversalSelect
                    onChange={memoizedAgeChangeHandler}
                    label="Age"
                    value={age}
                    selectOptions={memoizedGetAgeSelectOptions()}
                  />
                </div>
                <div className="modal__checkboxes-holder">
                  <CheckCategoryItems
                    label="Platforms"
                    onCheckedItemsUpdate={memoizedCheckedItemsUpdateHandler}
                    checkedPlatforms={platforms}
                  />
                </div>
              </div>
            </div>

            <div className="modal__buttonSubmit">
              <ButtonSubmit onClick={handleSubmitButtonClick} />
              {isAddModal ? (
                <ProductModalButton buttonText="Skip" onClick={props.onButtonCloseClick} />
              ) : (
                <ProductModalButton buttonText="Delete card" onClick={memoizedButtonDeleteClickHandler} />
              )}
            </div>
          </div>
        </div>
        {isShownConfirmation ? (
          <Modal>
            <ConfirmationModal
              productId={props.oldProduct?.id || 0}
              productName={props.oldProduct?.name || ""}
              onButtonCloseClick={memoizedRemoveButtonCloseClickHandler}
              onButtonYesClick={memoizedButtonYesClickHandler}
            />
          </Modal>
        ) : null}
      </>
    );
  }
);

MemoizedProductModal.displayName = "ProductModal";

export default MemoizedProductModal;
