import axios, { AxiosResponse } from "axios";
import { notification } from "antd";

export type TResponseData<O> = { data: O & { error_message?: string } };
export type TResponseExtra = { error: number; pid: string };
export type TResponse<O> = TResponseData<O> & TResponseExtra;
export type TRequest<I extends { [key: string]: any }, O> = (
  params: I
) => Promise<TResponse<O>>;
export type TItemsData<T> = {
  items: T[];
  page: number;
  count: number;
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  withCredentials: true,
});

export class RequestBuilder<I, O> {
  static instance = axiosInstance;

  private path!: string;

  withPath(path: string) {
    this.path = path;
    return this;
  }

  private _fallbackData?: O;

  withDataOnError(data: O) {
    this._fallbackData = data;
    return this;
  }

  private inputTransformer?: (input: any) => I;

  withInputTransformer(transformer: (input: any) => I) {
    this.inputTransformer = transformer;
    return this;
  }

  private outputTransformer?: (output: TResponse<any>) => O;

  withOutputTransformer<T>(transformer: (output: TResponse<T>) => O) {
    this.outputTransformer = transformer;
    return this;
  }

  build(): TRequest<I, O> {
    return async (...args: Parameters<TRequest<I, O>>) => {
      const input = args[0];

      const transformedInput =
        typeof this.inputTransformer === "function"
          ? this.inputTransformer(input)
          : input;

      const output = await RequestBuilder.instance.post<
        I,
        AxiosResponse<TResponse<O>>
      >(this.path, transformedInput);

      if (output.data.error) {
        notification.error({
          message: output.data.data.error_message ?? "Ошибка",
          placement: "topRight",
        });

        return {
          ...output.data,
          data: {
            ...output.data.data,
            data: this._fallbackData,
          },
        };
      }

      const transformedData =
        typeof this.outputTransformer === "function"
          ? this.outputTransformer(output.data)
          : output.data.data;

      return { ...output.data, data: transformedData };
    };
  }
}

export const FALLBACK_DATA = {};
export const FALLBACK_DATA_ITEMS = {
  items: [],
  page: 1,
  count: 0,
};
