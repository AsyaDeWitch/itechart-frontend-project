import CartItem from "@/shared/types/cartItem";
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

export async function buyProductsFromCart(
  id: number,
  cartItems: CartItem[],
  totalPrice: number
): Promise<AxiosResponse> {
  const productIds: number[] = [];
  cartItems.forEach((cartItem) => productIds.push(cartItem.product.id));
  const response = await api.post("/api/buyProductsFromCart", {
    id,
    productIds,
    totalPrice,
  });
  return response;
}

export async function removeProductsFromCart(id: number, cartItems: CartItem[]): Promise<AxiosResponse> {
  const productIds: number[] = [];
  cartItems.forEach((cartItem) => productIds.push(cartItem.product.id));

  const response = await api.delete("/api/removeProductsFromCart", {
    params: {
      id,
    },
    data: {
      productIds,
    },
  });
  return response;
}

export async function addProductToCart(id: number, productItem: ProductItem, platform: number): Promise<AxiosResponse> {
  const response = await api.post("/api/addProductToCart", {
    id,
    productId: productItem.id,
    platform,
  });
  return response;
}

export async function changeProductQuantityInCart(
  id: number,
  productItem: ProductItem,
  amount: number
): Promise<AxiosResponse> {
  const response = await api.post("/api/changeProductQuantityInCart", {
    id,
    productId: productItem.id,
    amount,
  });
  return response;
}

export async function changeProductChoosedPlatformInCart(
  id: number,
  productItem: ProductItem,
  platformId: number
): Promise<AxiosResponse> {
  const response = await api.post("/api/changeProductChoosedPlatformInCart", {
    id,
    productId: productItem.id,
    platformId,
  });
  return response;
}
