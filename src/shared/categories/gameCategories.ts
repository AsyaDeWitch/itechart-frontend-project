import JsonCategories from "../../mockData/categories.json";
import CategoryItem from "./categoryItem";

const Categories: CategoryItem[] = JsonCategories.map((category) => category);
export default Categories;
