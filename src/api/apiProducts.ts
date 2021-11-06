import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function searchGames(text: string): Promise<AxiosResponse> {
  const responce = await api.get("/api/search", {
    params: {
      text,
    },
  });
  return responce;
}

export async function getTopProducts(): Promise<AxiosResponse> {
  const response = await api.get("/api/getTopProducts");
  return response;
}
