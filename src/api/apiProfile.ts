import Address from "@/shared/types/address";
import Profile from "@/shared/types/profile";
import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function getProfile(id: number): Promise<AxiosResponse> {
  const response = await api.get("/api/getProfile", {
    params: {
      id,
    },
  });
  return response;
}

export async function saveProfile(id: number, updatedUser: Profile): Promise<AxiosResponse> {
  const response = await api.post("/api/saveProfile", {
    id,
    updatedUser,
  });
  return response;
}

export async function changePassword(id: number, newPassword: string): Promise<AxiosResponse> {
  const response = await api.post("/api/changePassword", {
    id,
    newPassword,
  });
  return response;
}

export async function changeProfileImage(id: number, image: string): Promise<AxiosResponse> {
  const response = await api.post("/api/changeProfileImage", {
    id,
    image,
  });
  return response;
}

export async function changeDefaultDeliveryAddress(id: number, address: Address): Promise<AxiosResponse> {
  const response = await api.post("/api/changeDefaultDeliveryAddress", {
    id,
    address,
  });
  return response;
}
