import JsonCategories from "../../mockData/categories.json";
import CategoryItem from "./categoryItem";

const Categories: CategoryItem[] = [];
JsonCategories.forEach((item) => {
  Categories.push(item);
});

export default Categories;
