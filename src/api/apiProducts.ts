import { AxiosResponse } from "axios";
import ProductItem from "@/shared/types/productItem";
import api from "./apiAxios";

export async function searchGames(text: string): Promise<AxiosResponse> {
  const response = await api.get("/search", {
    params: {
      text,
    },
  });
  return response;
}

export async function getTopProducts(): Promise<AxiosResponse> {
  const response = await api.get("/getTopProducts");
  return response;
}

export async function products(
  sortType: string,
  sortDir: string,
  genre: string,
  age: string,
  searchName: string,
  category: string
): Promise<AxiosResponse> {
  const response = await api.get("/products", {
    params: {
      sortType,
      sortDir,
      genre,
      age,
      searchName,
      category,
    },
  });
  return response;
}

export async function AddNewProduct(newProduct: ProductItem): Promise<AxiosResponse> {
  const response = await api.post("/product", {
    newProduct,
  });
  return response;
}

export async function EditProduct(product: ProductItem): Promise<AxiosResponse> {
  const response = await api.put("/product", {
    product,
  });
  return response;
}

export async function RemoveProduct(id: number): Promise<AxiosResponse> {
  const response = await api.delete("/product", {
    params: {
      id,
    },
  });
  return response;
}
