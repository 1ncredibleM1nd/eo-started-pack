import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { notification } from "antd";
import { globalStore } from "..";

export class AppStore {
  isLoaded: boolean = false;
  info_tab: string = "none";
  layout: string = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setInfoTab(tab: string) {
    if (this.info_tab === tab) {
      this.info_tab = "none";
    } else {
      this.info_tab = tab;
    }
  }

  setLoading(loading: boolean) {
    this.isLoaded = loading;
  }

  setLayout(layout: string) {
    this.layout = layout;
  }

  activeSchool(): void {
    contactStore.contact = [];
    this.setLoading(false);
  }

  async initialization() {
    notification.config({ placement: "bottomRight", bottom: 50, duration: 3 });

    const query = new URLSearchParams(window.location.search);

    await globalStore.init();
    await contactStore.load(query.get("im"));
  }
}

export const appStore = new AppStore();
