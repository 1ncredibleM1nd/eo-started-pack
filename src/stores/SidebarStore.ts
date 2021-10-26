import { makeAutoObservable } from "mobx";

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
