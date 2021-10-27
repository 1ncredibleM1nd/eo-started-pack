import store from "store";
import { makeAutoObservable } from "mobx";
import { Channel } from "./model/Channel";

export class ChannelsStore {
  channels: Channel[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get enabledChannels() {
    return this.channels.filter(({ enabled }) => enabled);
  }

  get activeChannels() {
    return this.channels.filter(({ active }) => active);
  }

  get activeChannelsCount() {
    return this.activeChannels.length;
  }

  async init() {
    const savedChannels = store.get("channels", {});

    this.channels.push(
      new Channel(
        "instagram",
        "instagram",
        savedChannels["instagram"] ?? true,
        true
      ),
      new Channel(
        "vkontakte",
        "vkontakte",
        savedChannels["vkontakte"] ?? true,
        true
      ),
      new Channel(
        "odnoklassniki",
        "odnoklassniki",
        savedChannels["odnoklassniki"] ?? true,
        true
      ),
      new Channel(
        "facebook",
        "facebook",
        savedChannels["facebook"] ?? true,
        true
      ),
      new Channel(
        "telegram",
        "telegram",
        savedChannels["telegram"] ?? true,
        true
      ),

      new Channel(
        "whatsapp",
        "whatsapp",
        savedChannels["whatsapp"] ?? false,
        false
      ),
      new Channel("viber", "viber", savedChannels["viber"] ?? false, false),
      new Channel("email", "email", savedChannels["email"] ?? false, false)
    );
  }
}
