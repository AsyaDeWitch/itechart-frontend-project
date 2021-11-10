import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function signIn(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.post("/api/auth/signIn", {
    userName,
    password,
  });
  console.log(response);
  return response;
}

export async function signUp(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.put("/api/auth/signUp", {
    userName,
    password,
  });
  return response;
}
