import Categories from "@/shared/categories/gameCategories";
import categoryImages from "@/shared/categories/categoryImages";
import CategoryItem from "@/shared/categories/categoryItem";
import { memo } from "react";
import CategoryCard from "./categoryCard";
import "./categoryCardsContainer.scss";

// eslint-disable-next-line prefer-arrow-callback
const MemoizedCategoryCardsContainer = memo(function CategoryCardsContainer(): JSX.Element {
  return (
    <>
      <ul className="category__cards-container">
        {Categories.map((item: CategoryItem, index) => (
          <li key={`${item.name}${index.toString()}`} className="category__card-container">
            <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
          </li>
        ))}
      </ul>
    </>
  );
});

export default MemoizedCategoryCardsContainer;
