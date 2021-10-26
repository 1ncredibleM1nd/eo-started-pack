import { makeAutoObservable } from "mobx";

type TLayout = "contact" | "chat";

export class LayoutStore {
  layout: TLayout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLayout(layout: TLayout) {
    this.layout = layout;
  }
}
