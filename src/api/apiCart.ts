import ProductItem from "@/shared/types/productItem";
import { AxiosResponse } from "axios";
import api from "./apiAxios";

export async function getProductsInCart(id: number): Promise<AxiosResponse> {
  const response = await api.get("/api/getProductsInCart", {
    params: {
      id,
    },
  });
  return response;
}

export async function buyProductsFromCart(id: number): Promise<AxiosResponse> {
  const response = await api.post("/api/buyProductsFromCart", {
    params: {
      id,
    },
  });
  return response;
}

export async function removeProductsFromCart(id: number, productItems: ProductItem[]): Promise<AxiosResponse> {
  const productIds: number[] = [];
  productItems.forEach((product) => productIds.push(product.id));

  const response = await api.delete("/api/buyProductsFromCart", {
    params: {
      id,
      productIds,
    },
  });
  return response;
}

export async function addProductToCart(id: number, productItem: ProductItem): Promise<AxiosResponse> {
  const response = await api.post("/api/buyProductsFromCart", {
    id,
    productId: productItem.id,
  });
  return response;
}

export async function changeProductQuantityInCart(id: number, productItem: ProductItem): Promise<AxiosResponse> {
  const response = await api.post("/api/buyProductsFromCart", {
    id,
    productId: productItem.id,
  });
  return response;
}
