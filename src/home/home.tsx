// import axios from "axios";
import { PureComponent } from "react";
import GameCard from "../components/products/gameCard";
import SearchBar from "./searchBar";
import Spinner from "./spinner";

export default class Home extends PureComponent {
  render(): JSX.Element {
    return (
      <>
        <h2>Home page</h2>
        <SearchBar />
        <Spinner delay={300} />
        <GameCard />
        <GameCard />
        <GameCard />
      </>
    );
  }
}
