import { memo } from "react";
// import Categories from "../../../shared/categories/gameCategories";
// import categoryImages from "../../../shared/categories/categoryImages";
// import CategoryItem from "../../../shared/categories/categoryItem";
// import CategoryCard from "./categoryCard";
import styles from "./categoryCardsContainer.scss";

export function CategoryCardsContainer(): JSX.Element {
  return (
    <>
      <ul className={styles["category__cards-container"]}>
        {/* {Categories.map((item: CategoryItem, index) => (
          <li key={`${item.name}${index.toString()}`} className={styles["category__card-container"]}>
            <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
          </li>
        ))} */}
      </ul>
    </>
  );
}

export default memo(CategoryCardsContainer);
