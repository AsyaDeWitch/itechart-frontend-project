import CategoryItem from "@/shared/categories/categoryItem";
import RouteItems from "@/shared/routes/items/routeItems";
import { memo } from "react";
import { Link } from "react-router-dom";
import "./categoryCard.scss";

const MemoizedCategoryCard = memo(
  (props: { categoryItem: CategoryItem; image: string }): JSX.Element => (
    <Link className="category-card" to={`${RouteItems.Products.url}/${props.categoryItem.name}`}>
      <img className="category-card__image" src={props.image} alt={props.categoryItem.image} />
      <p className="category-card__name">{props.categoryItem.name}</p>
    </Link>
  )
);

MemoizedCategoryCard.displayName = "CategoryCard";

export default MemoizedCategoryCard;
