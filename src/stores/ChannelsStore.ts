import { getEnv, Instance, types } from "mobx-state-tree";
import { Channel } from "./model/Channel";

export const ChannelsStore = types
  .model("SourcesStore", {
    channels: types.array(Channel),
  })
  .views((self) => ({
    get enabledChannels() {
      return self.channels.filter(({ enabled }) => enabled);
    },

    get activeChannels() {
      return self.channels.filter(({ active }) => active);
    },
  }))
  .actions((self) => ({
    init() {
      const { storage } = getEnv(self);

      const savedChannels = storage.get("channels", {});
      self.channels.push(
        {
          id: "whatsapp",
          name: "whatsapp",
          enabled: false,
          active: savedChannels["whatsapp"] ?? false,
        },
        {
          id: "instagram",
          name: "instagram",
          enabled: true,
          active: savedChannels["instagram"] ?? true,
        },
        {
          id: "vkontakte",
          name: "vkontakte",
          enabled: true,
          active: savedChannels["vkontakte"] ?? true,
        },
        {
          id: "odnoklassniki",
          name: "odnoklassniki",
          enabled: true,
          active: savedChannels["odnoklassniki"] ?? true,
        },
        {
          id: "viber",
          name: "viber",
          enabled: false,
          active: savedChannels["viber"] ?? false,
        },
        {
          id: "facebook",
          name: "facebook",
          enabled: true,
          active: savedChannels["facebook"] ?? true,
        },
        {
          id: "telegram",
          name: "telegram",
          enabled: true,
          active: savedChannels["telegram"] ?? true,
        },
        {
          id: "email",
          name: "email",
          enabled: false,
          active: savedChannels["email"] ?? false,
        }
      );
    },
  }));

export type ChannelsStoreInstance = Instance<typeof ChannelsStore>;
