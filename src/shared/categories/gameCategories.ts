import JsonCategories from "../../mockData/categories.json";

const Categories: string[] = [];
JsonCategories.forEach((item) => {
  Categories.push(item.name);
});

export default Categories;
