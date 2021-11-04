import { PureComponent } from "react";
import Categories from "@/shared/categories/gameCategories";
import GameCard from "../components/products/gameCard";
import SearchBar from "./searchBar";
import Spinner from "./spinner";
import "./home.scss";
import CategoryCard from "./categoryCard";
import * as api from "../api/apiProducts";
import ProductItem from "../shared/types/productItem";

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
        {Categories.map((name: string) => (
          <CategoryCard key={name} categoryName={name} />
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
