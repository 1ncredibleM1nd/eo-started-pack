import { getEnv, Instance, types } from "mobx-state-tree";

export const Channel = types
  .model("Channel", {
    id: types.identifier,
    name: types.string,
    active: types.boolean,
    enabled: types.boolean,
  })
  .actions((self) => ({
    setActive(active: boolean) {
      self.active = active;

      const { storage } = getEnv(self);
      storage.set("channels", {
        ...storage.get("channels", {}),
        [self.id]: active,
      });
    },
  }));

export type ChannelInstance = Instance<typeof Channel>;
