import axios from "axios";

export type TRequestParams<I extends { [key: string]: any }> = I;

export type TResponse<T> = {
  data: T & { error_message?: string };
  pid: string;
  error: number;
};

export type TItemsResponse<T> = TResponse<{
  items: T[];
  page: number;
  count: number;
}>;

export const client = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

client.interceptors.request.use();
