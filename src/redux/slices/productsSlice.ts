import ProductItem from "@/shared/types/productItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const nullProductItems: ProductItem[] = [];

interface ProductsState {
  products: ProductItem[];
}

const initialState = { products: nullProductItems } as ProductsState;

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsData(state, action: PayloadAction<ProductItem[]>) {
      return {
        ...state,
        products: action.payload,
      };
    },
  },
});

export const { setProductsData } = ProductsSlice.actions;
export default ProductsSlice.reducer;
