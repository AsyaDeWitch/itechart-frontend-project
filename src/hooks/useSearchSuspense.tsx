import ProductItem from "@/shared/types/productItem";
import { useEffect, useState } from "react";
import * as apiProducts from "@/api/apiProducts";
import Spinner from "@/home/spinner/spinner";
import ProductsPanel from "@/components/products/productsPanel";

const nullProductItems: ProductItem[] = [];

function useSearchSuspense(
  sortType: string,
  sortDir: string,
  genre: string,
  age: string,
  searchName: string,
  category: string
): JSX.Element {
  const [apiData, setApiData] = useState(nullProductItems);
  const [isLoading, setIsLoading] = useState(false);

  async function getSearchGames() {
    try {
      setIsLoading(true);
      const response = await apiProducts.products(sortType, sortDir, genre, age, searchName, !category ? "" : category);
      setApiData(response.data);
    } catch (error) {
      console.log((error as Error).message);
      setApiData([]);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getSearchGames();
  }, [sortType, sortDir, genre, age, searchName, category]);

  return isLoading ? (
    <div className="games__table__spinner">
      <Spinner />
    </div>
  ) : (
    <ProductsPanel productItems={apiData} />
  );
}

export default useSearchSuspense;
