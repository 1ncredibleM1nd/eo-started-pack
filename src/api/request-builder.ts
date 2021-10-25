import { API } from "@/actions/axios";
import { AxiosResponse } from "axios";

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

export class RequestBuilder<I, O> {
  private path!: string;

  withPath(path: string) {
    this.path = path;
    return this;
  }

  private inputTransformer?: (input: any) => I;

  withInputTransformer(transformer: (input: any) => I) {
    this.inputTransformer = transformer;
    return this;
  }

  private outputTransformer?: (output: TResponse<O>) => O;

  withOutputTransformer(transformer: (output: TResponse<O>) => O) {
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

      const output = await API.post<I, AxiosResponse<TResponse<O>>>(
        this.path,
        transformedInput
      );

      const transformedData =
        typeof this.outputTransformer === "function"
          ? this.outputTransformer(output.data)
          : output.data.data;

      return { ...output.data, data: transformedData };
    };
  }
}
