import ProductItem from "@/shared/types/productItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nullProductItems: ProductItem[] = [];

interface ProductsState {
  products: ProductItem[];
  isNeedToUpdate: boolean;
}

const initialState = { products: nullProductItems, isNeedToUpdate: false } as ProductsState;

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsData(state, action: PayloadAction<ProductItem[]>) {
      return {
        ...state,
        products: action.payload,
        isNeedToUpdate: false,
      };
    },
    setIsNeedToUpdate(state) {
      return {
        ...state,
        isNeedToUpdate: true,
      };
    },
  },
});

export const { setProductsData, setIsNeedToUpdate } = ProductsSlice.actions;
export default ProductsSlice.reducer;
