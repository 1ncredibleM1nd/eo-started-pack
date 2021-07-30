import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { getConversations } from "@/actions";
import { notification } from "antd";
import { globalStore } from "..";

export class AppStore {
  isLoaded: boolean = false;
  info_tab: string = "none";
  layout: string = "contact";
  activeContactPageNumber: number = 1;

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

  setContactPageNumber(value: number) {
    this.activeContactPageNumber = value;
  }

  activeSchool(): void {
    contactStore.contact = [];
    this.setLoading(false);
  }

  async updateContact() {
    const conversationList: Array<any> = await getConversations(
      globalStore.schoolsStore.activeSchoolsIds,
      1
    );

    await contactStore.init(conversationList);
  }

  async initialization() {
    await globalStore.init();

    // сконфигурируем уведомления
    notification.config({ placement: "bottomRight", bottom: 50, duration: 3 });

    this.runUpdateContact();
  }

  async runUpdateContact() {
    await this.updateContact();

    setTimeout(() => this.runUpdateContact(), 1000);
  }
}

export const appStore = new AppStore();
