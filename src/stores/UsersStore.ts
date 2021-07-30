import { AxiosResponse } from "axios";
import { flow, getEnv, types } from "mobx-state-tree";
import { User } from "./model/User";
import type { TApiUser } from "../ApiResolvers/Account";
import type { StoreEnvironment } from "./StoreEnvironment";

export const UsersStore = types
  .model("UsersStore", {
    user: types.maybeNull(User),
  })
  .actions((self) => ({
    init: flow(function* init() {
      const { api } = getEnv<StoreEnvironment>(self);
      const { data }: AxiosResponse<TApiUser> = yield api.account.info();
      self.user = User.create(data.data);
    }),
  }));
