import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function signIn(userName: string, password: string): Promise<AxiosResponse> {
  const responce = await api.post("/api/auth/signIn", {
    data: {
      userName,
      password,
    },
  });
  return responce;
}

export async function signUp(userName: string, password: string): Promise<AxiosResponse> {
  const response = await api.put("/api/auth/signUp", {
    data: {
      userName,
      password,
    },
  });
  return response;
}
