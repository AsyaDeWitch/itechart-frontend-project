import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function signIn(userName: string, password: string): Promise<AxiosResponse> {
  const responce = await api.post("/api/auth/signIn", {
    userName,
    password,
  });
  return responce;
}

export async function signUp(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.put("/api/auth/signUp", {
    userName,
    password,
  });
  return response;
}
