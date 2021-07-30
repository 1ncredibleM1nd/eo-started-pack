import { getEnv, Instance, types } from "mobx-state-tree";

export const School = types
  .model("School", {
    id: types.identifier,
    logo: types.string,
    name: types.string,
    active: types.boolean,
  })
  .actions((self) => ({
    setActive(active: boolean) {
      self.active = active;

      const { storage } = getEnv(self);
      storage.set("schools", {
        ...storage.get("schools", {}),
        [self.id]: active,
      });
    },
  }));

export type SchoolInstance = Instance<typeof School>;
