import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class SidebarStore {
  opened = true;

  constructor() {
    makeAutoObservable(this);
  }

  setOpened(opened: boolean) {
    this.opened = opened;
  }

  toggle() {
    this.setOpened(!this.opened);
  }
}
