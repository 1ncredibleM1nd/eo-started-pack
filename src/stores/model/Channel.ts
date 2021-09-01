import store from "store";
import { makeAutoObservable } from "mobx";

export class Channel {
  id: string;
  name: string;
  active: boolean;
  enabled: boolean;

  constructor(id: string, name: string, active: boolean, enabled: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.name = name;
    this.active = active;
    this.enabled = enabled;
  }

  setActive(active: boolean) {
    this.active = active;

    store.set("channels", {
      ...store.get("channels", {}),
      [this.id]: active,
    });
  }
}
