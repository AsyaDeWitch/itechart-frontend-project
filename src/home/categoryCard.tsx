import CategoryItem from "@/shared/categories/categoryItem";
import RouteItems from "@/shared/routes/items/routeItems";
import { Link } from "react-router-dom";
import "./categoryCard.scss";

export default function CategoryCard(props: { categoryItem: CategoryItem; image: string }): JSX.Element {
  return (
    <>
      {/* https://codepen.io/ngthuongdoan/pen/wvWvbbj
      <div class="container">
  <div class="card__container">
    <div class="card">
      <div class="card__content">
        <h3 class="card__header">Card 1</h3>
        <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="card__button">Read now</button>
      </div>
    </div>
    <div class="card">
      <div class="card__content">
        <h3 class="card__header">Card 2</h3>
        <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="card__button">Read now</button>
      </div>
    </div>
    <div class="card">
      <div class="card__content">
        <h3 class="card__header">Card 3</h3>
        <p class="card__info">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button class="card__button">Read now</button>
      </div>
    </div>
  </div>
</div> */}
      <Link className="category-card" to={RouteItems.Products.url.concat("/".concat(props.categoryItem.name))}>
        <img src={props.image} alt={props.categoryItem.image} className="category-card__image" />
        {props.categoryItem.name}
      </Link>
    </>
  );
}
