import { makeAutoObservable } from "mobx";

type TLayout = "contact" | "chat";

export class AppStore {
  layout: TLayout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLayout(layout: TLayout) {
    this.layout = layout;
  }
}

export const appStore = new AppStore();
