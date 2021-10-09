import { makeAutoObservable } from "mobx";
import { singleton } from "tsyringe";

type TLayout = "contact" | "chat";

@singleton()
export class LayoutStore {
  layout: TLayout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLayout(layout: TLayout) {
    this.layout = layout;
  }
}
