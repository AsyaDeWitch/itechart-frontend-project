import { AxiosResponse } from "axios";
import Address from "@/shared/types/address";
import Profile from "@/shared/types/profile";
import api from "./apiAxios";

export async function getProfile(id: number): Promise<AxiosResponse> {
  const response = await api.get("/getProfile", {
    params: {
      id,
    },
  });
  return response;
}

export async function saveProfile(updatedUser: Profile): Promise<AxiosResponse> {
  const response = await api.post("/saveProfile", {
    updatedUser,
  });
  return response;
}

export async function changePassword(id: number, newPassword: string): Promise<AxiosResponse> {
  const response = await api.post("/changePassword", {
    id,
    newPassword,
  });
  return response;
}

export async function changeDefaultDeliveryAddress(id: number, address: Address): Promise<AxiosResponse> {
  const response = await api.post("/changeDefaultDeliveryAddress", {
    id,
    address,
  });
  return response;
}

export async function getBalance(id: number): Promise<AxiosResponse> {
  const response = await api.get("/getBalance", {
    params: {
      id,
    },
  });
  return response;
}
