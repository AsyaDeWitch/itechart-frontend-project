import { PureComponent } from "react";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";
import ProductItem from "@/shared/types/productItem";
import GameCard from "@/components/products/gameCard";
import * as api from "@/api/apiProducts";
import categoryImages from "@/shared/categories/categoryImages";
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
        Categories
        <hr />
        {Categories.map((item: CategoryItem, index) => (
          <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
        ))}
        New games
        <hr />
        {this.state.topProducts.map((item: ProductItem) => (
          <GameCard key={item.id} productItem={item} />
        ))}
      </>
    );
  }
}
