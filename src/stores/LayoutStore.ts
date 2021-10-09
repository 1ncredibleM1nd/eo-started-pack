import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

type TLayout = "contact" | "chat";

@injectable()
export class LayoutStore {
  layout: TLayout = "contact";

  constructor() {
    makeAutoObservable(this);
  }

  setLayout(layout: TLayout) {
    this.layout = layout;
  }
}
