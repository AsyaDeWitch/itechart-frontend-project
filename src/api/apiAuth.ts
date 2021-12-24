import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function signIn(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.post("/auth/signIn", {
    userName,
    password,
  });
  return response;
}

export async function signUp(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.put("/auth/signUp", {
    userName,
    password,
  });
  return response;
}
