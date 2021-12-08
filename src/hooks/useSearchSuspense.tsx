import ProductItem from "@/shared/types/productItem";
import { useEffect, useState } from "react";
import * as apiProducts from "@/api/apiProducts";
import Spinner from "@/components/home/elements/spinner";
import ProductsPanel from "@/components/products/panels/productsPanel/productsPanel";
import { TStore } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProductsData } from "@/redux/slices/productsSlice";

const nullProductItems: ProductItem[] = [];

function useSearchSuspense(
  sortType: string,
  sortDir: string,
  genre: string,
  age: string,
  searchName: string,
  category: string,
  isNeedToUpdate: boolean
): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { products } = useSelector((state: TStore) => state.reducer.productsReducer);
  const dispatch = useDispatch();

  //
  async function getSearchGames() {
    try {
      setIsLoading(true);
      const response = await apiProducts.products(sortType, sortDir, genre, age, searchName, !category ? "" : category);
      dispatch(setProductsData(response.data));
    } catch (error) {
      console.log((error as Error).message);
      dispatch(setProductsData(nullProductItems));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getSearchGames();
  }, [sortType, sortDir, genre, age, searchName, category, isNeedToUpdate]);

  return isLoading ? (
    <div className="games__table__spinner">
      <Spinner />
    </div>
  ) : (
    <ProductsPanel productItems={products} />
  );
}

export default useSearchSuspense;
