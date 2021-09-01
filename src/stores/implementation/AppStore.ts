import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { notification } from "antd";
import { globalStore } from "..";

export class AppStore {
  isLoaded = false;
  info_tab = "none";
  layout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(loading: boolean) {
    this.isLoaded = loading;
  }

  setLayout(layout: string) {
    this.layout = layout;
  }

  async initialization() {
    notification.config({ placement: "bottomRight", bottom: 50, duration: 3 });

    const query = new URLSearchParams(window.location.search);

    await globalStore.init();
    await contactStore.load(query.get("im"));
  }
}

export const appStore = new AppStore();
