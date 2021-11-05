import { PureComponent, ChangeEvent } from "react";
import * as api from "@/api/apiProducts";
import debounce from "lodash/debounce";
import { AxiosResponse } from "axios";
import GameCardsContainer from "@/components/products/gameCardsContainer";
import SearchBar from "./searchBar/searchBar";
import Spinner from "./spinner/spinner";
import "./home.scss";
import CategoryCardsContainer from "./categoryCards/categoryCardsContainer";

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
        {this.state.isLoading ? (
          <div className="home_spinner">
            <Spinner />
          </div>
        ) : (
          <GameCardsContainer productItems={this.state.foundGames} />
        )}
        <h3 className="home__chapter">Categories</h3>
        <hr />
        <CategoryCardsContainer />
        <h3 className="home__chapter">New games</h3>
        <hr />
        <GameCardsContainer productItems={this.state.topProducts} />
      </>
    );
  }
}
