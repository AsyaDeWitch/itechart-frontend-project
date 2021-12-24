import { AxiosResponse } from "axios";
import CartItem from "@/shared/types/cartItem";
import ProductItem from "@/shared/types/productItem";
import api from "./apiAxios";

export async function getProductsInCart(id: number): Promise<AxiosResponse> {
  const response = await api.get("/getProductsInCart", {
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
  const productIds = cartItems.map((item) => item.product.id);
  const response = await api.post("/buyProductsFromCart", {
    id,
    productIds,
    totalPrice,
  });
  return response;
}

export async function removeProductsFromCart(id: number, cartItems: CartItem[]): Promise<AxiosResponse> {
  const productIds = cartItems.map((item) => item.product.id);

  const response = await api.delete("/removeProductsFromCart", {
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
  const response = await api.post("/addProductToCart", {
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
  const response = await api.post("/changeProductQuantityInCart", {
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
  const response = await api.post("/changeProductChoosedPlatformInCart", {
    id,
    productId: productItem.id,
    platformId,
  });
  return response;
}
