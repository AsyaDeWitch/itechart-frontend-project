import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function searchGames(text: string): Promise<AxiosResponse> {
  const response = await api.get("/api/search", {
    params: {
      text,
    },
  });
  return response;
}

export async function getTopProducts(): Promise<AxiosResponse> {
  const response = await api.get("/api/getTopProducts");
  return response;
}

export async function products(
  sortType: number,
  sortDir: number,
  genre: number,
  age: number,
  searchName: string,
  category: number
): Promise<AxiosResponse> {
  const response = await api.get("/api/products", {
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
