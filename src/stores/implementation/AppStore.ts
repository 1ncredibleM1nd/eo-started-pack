import { makeAutoObservable } from "mobx";

export class AppStore {
  layout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLayout(layout: string) {
    this.layout = layout;
  }
}

export const appStore = new AppStore();
