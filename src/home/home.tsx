import { PureComponent, ChangeEvent } from "react";
import Categories from "@/shared/categories/gameCategories";
import CategoryItem from "@/shared/categories/categoryItem";
import ProductItem from "@/shared/types/productItem";
import GameCard from "@/components/products/gameCard";
import * as api from "@/api/apiProducts";
import categoryImages from "@/shared/categories/categoryImages";
import GameImages from "@/shared/games/gameImages";
import debounce from "lodash/debounce";
import { AxiosResponse } from "axios";
import SearchBar from "./searchBar";
import Spinner from "./spinner";
import "./home.scss";
import CategoryCard from "./categoryCard";

interface State {
  topProducts: [];
  foundGames: [];
  searchText: string;
  isLoading: boolean;
}

interface Props {
  default?: string;
}

export default class Home extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { topProducts: [], searchText: "", foundGames: [], isLoading: false };
  }

  async componentDidMount(): Promise<void> {
    const response = await api.getTopProducts();
    this.setState({ topProducts: response.data });
  }

  async componentDidUpdate(_: Props, prevState: State): Promise<void> {
    if (this.state.searchText !== "" && this.state.searchText !== prevState.searchText) {
      console.log(this.state.searchText);
      const response = await api.searchGames(this.state.searchText);
      this.handleFoundGamesChange(response.data);
      console.log(this.state.foundGames);
    }
    if (this.state.searchText === "" && prevState.searchText !== "") {
      this.state.foundGames.length = 0;
    }
    console.log(this.state.searchText, " vs ", prevState.searchText);
    console.log(this.state.searchText === "" && prevState.searchText !== "");
  }

  handleFoundGamesChange = (data: AxiosResponse["data"]): void => {
    this.setState({ foundGames: data });
  };

  handleDebouncedSearchChange = debounce((event) => {
    this.setState({ searchText: event.target.value });
    this.setState({ isLoading: false });
  }, 1000);

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ isLoading: true });
    this.handleDebouncedSearchChange(event);
  };

  render(): JSX.Element {
    return (
      <>
        <div className="home__searchBar">
          <SearchBar onKeyUp={this.handleSearchChange} />
        </div>
        {this.state.isLoading ? <Spinner /> : null /* Search part with games */}
        <h3 className="home__chapter">Categories</h3>
        <hr />
        <ul className="category__cards-container">
          {Categories.map((item: CategoryItem, index) => (
            <li key={item.name.concat(index.toString())} className="category__card-container">
              <CategoryCard key={item.name} categoryItem={item} image={categoryImages[index]} />
            </li>
          ))}
        </ul>
        <h3 className="home__chapter">New games</h3>
        <hr />
        <ul className="game__cards-container">
          {this.state.topProducts.map((item: ProductItem) => (
            <li
              key={item.id.toString().concat(item.name)}
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
