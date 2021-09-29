import { API } from "@/actions/axios";

export type TRequest<I extends { [key: string]: any }, O> = (
  params: I
) => Promise<O>;

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

  private outputTransformer?: (output: any) => O;

  withOutputTransformer(transformer: (output: any) => O) {
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

      const output = await API.post(this.path, transformedInput);

      const transformedOutput =
        typeof this.outputTransformer === "function"
          ? this.outputTransformer(output.data.data)
          : output.data.data;

      return transformedOutput;
    };
  }
}
