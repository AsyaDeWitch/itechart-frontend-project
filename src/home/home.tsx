// import axios from "axios";
import { PureComponent } from "react";
import GameCard from "../components/products/gameCard";
import SearchBar from "./searchBar";
import Spinner from "./spinner";
import "./home.scss";
import CategoryCard from "./categoryCard";

export default class Home extends PureComponent {
  render(): JSX.Element {
    return (
      <>
        <h2>Home page</h2>
        <div className="home__searchBar">
          <SearchBar />
        </div>
        <Spinner delay={300} />
        Categories
        <hr />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        New games
        <hr />
        <GameCard productItem="item1" />
        <GameCard productItem="item2" />
        <GameCard productItem="item3" />
      </>
    );
  }
}
