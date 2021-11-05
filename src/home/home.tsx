import { PureComponent } from "react";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";
import ProductItem from "@/shared/types/productItem";
import GameCard from "@/components/products/gameCard";
import * as api from "@/api/apiProducts";
import categoryImages from "@/shared/categories/categoryImages";
import GameImages from "@/shared/games/gameImages";
import SearchBar from "./searchBar";
import Spinner from "./spinner";
import "./home.scss";
import CategoryCard from "./categoryCard";

interface State {
  topProducts: [];
}

interface Props {
  default?: string;
}

export default class Home extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { topProducts: [] };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.getTopProducts();
    this.setState({ topProducts: response.data });
  }

  render(): JSX.Element {
    return (
      <>
        <div className="home__searchBar">
          <SearchBar />
        </div>
        <Spinner delay={300} />
        <h3 className="home__chapter">Categories</h3>
        <hr />
        <ul className="category__cards-container">
          {Categories.map((item: CategoryItem, index) => (
            <li className="category__card-container">
              <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
            </li>
          ))}
        </ul>
        <h3 className="home__chapter">New games</h3>
        <hr />
        <ul className="game__cards-container">
          {this.state.topProducts.map((item: ProductItem) => (
            <li
              className="game__card-container"
              onClick={() => alert("got product!")}
              onKeyPress={() => alert("got product!")}
              role="menuitem"
            >
              <GameCard key={item.id} productItem={item} image={GameImages[item.id - 1]} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
