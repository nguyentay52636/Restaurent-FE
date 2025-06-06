import axiosInstance from '@/lib/apis/axiosInstance';
import { IUserDataType, PaymentType } from './types.';

export const getAllPayments = async () => {
  try {
    const { data } = await axiosInstance.get('/payments');
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

export const createPayment = async ({ orderId, paymentMethod, amount, status }: PaymentType) => {
  try {
    const newPayment: PaymentType = {
      orderId,
      paymentMethod,
      amount,
      status,
    };
    const { data } = await axiosInstance.post('/payments', newPayment);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const deletePayment = async (id: number) => {
  try {
    const { data } = await axiosInstance.delete(`/payments/${id}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const getPaymentById = async (id: number) => {
  try {
    const { data } = await axiosInstance.get(`/payments/${id}`);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
export const updatePayment = async (
  id: number,
  { orderId, paymentMethod, amount, status }: PaymentType,
) => {
  try {
    const updatedPayment: PaymentType = {
      orderId,
      paymentMethod,
      amount,
      status,
    };
    const { data } = await axiosInstance.patch(`/payments/${id}`, updatedPayment);
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};

 export const updateUserPoints = async (id: number, {points} :IUserDataType) => {   
  try {
    const { data } = await axiosInstance.patch(`/users/${id}`, { points });
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
} 
