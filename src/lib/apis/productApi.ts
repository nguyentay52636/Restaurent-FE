import axiosInstance from '@/lib/apis/axiosInstance';
import { ProductType } from './types.';

export const getAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get('/products');
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const createProduct = async ({
  name,
  description,
  price,
  image,
  categoryId,
  status,
}: ProductType) => {
  try {
    const newProduct: ProductType = {
      name,
      description,
      price,
      image,
      categoryId,
      status,
    };
    const { data } = await axiosInstance.post('/products', newProduct);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const updateProduct = async (
  id: number,
  { name, description, price, image, categoryId, status }: ProductType,
) => {
  try {
    const updateProduct: ProductType = {
      name,
      description,
      price,
      image,
      categoryId,
      status,
    };
    const { data } = await axiosInstance.patch(`/products/${id}`, updateProduct);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const deleteProduct = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/products/${id}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
