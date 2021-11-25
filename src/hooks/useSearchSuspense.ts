import ProductItem from "@/shared/types/productItem";
import { useEffect, useState } from "react";
import * as apiProducts from "@/api/apiProducts";

const nullProductItems: ProductItem[] = [];

function useSearchSuspense(
  sortType: string,
  sortDir: string,
  genre: string,
  age: string,
  searchName: string,
  category: string
): ProductItem[] {
  const [apiData, setApiData] = useState(nullProductItems);
  async function getSearchGames(): Promise<ProductItem[]> {
    try {
      const response = await apiProducts.products(sortType, sortDir, genre, age, searchName, !category ? "" : category);
      return response.data;
    } catch (error) {
      console.log((error as Error).message);
      return [];
    }
  }

  useEffect(() => {
    getSearchGames().then((games) => setApiData(games));
  }, [sortType, sortDir, genre, age, searchName, category]);

  return apiData;
}

export default useSearchSuspense;
