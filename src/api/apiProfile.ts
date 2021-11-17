import Address from "@/shared/types/address";
import User from "@/shared/types/user";
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

export async function saveProfile(updatedUser: User): Promise<AxiosResponse> {
  const response = await api.post("/api/saveProfile", {
    params: {
      updatedUser,
    },
  });
  return response;
}

export async function changePassword(id: number, newPassword: string): Promise<AxiosResponse> {
  const response = await api.post("/api/changePassword", {
    params: {
      id,
      newPassword,
    },
  });
  return response;
}

// image type????????????????????????
export async function changeProfileImage(id: number, image: string): Promise<AxiosResponse> {
  const response = await api.post("/api/changeProfileImage", {
    params: {
      id,
      image,
    },
  });
  return response;
}

export async function changeDefaultDeliveryAddress(id: number, address: Address): Promise<AxiosResponse> {
  const response = await api.post("/api/changeDefaultDeliveryAddress", {
    params: {
      id,
      address,
    },
  });
  return response;
}
