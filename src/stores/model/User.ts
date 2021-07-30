import { Instance, types } from "mobx-state-tree";

export const User = types.model("User", {
  id: types.number,
  username: types.string,
  avatar: types.maybeNull(types.string),
});

export type UserInstance = Instance<typeof User>;
