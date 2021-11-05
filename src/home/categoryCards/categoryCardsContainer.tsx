import Categories from "@/shared/categories/gameCategories";
import categoryImages from "@/shared/categories/categoryImages";
import CategoryItem from "@/shared/categories/categoryItem";
import CategoryCard from "./categoryCard";
import "./categoryCardsContainer.scss";

export default function CategoryCardsContainer(): JSX.Element {
  return (
    <>
      <ul className="category__cards-container">
        {Categories.map((item: CategoryItem, index) => (
          <li key={item.name.concat(index.toString())} className="category__card-container">
            <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
          </li>
        ))}
      </ul>
    </>
  );
}
