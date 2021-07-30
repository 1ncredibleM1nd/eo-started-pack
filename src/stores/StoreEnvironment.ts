import * as store from "store";
import type { TApi } from "../ApiResolvers";

export type StoreEnvironment = {
  api: TApi;
  storage: typeof store;
};
