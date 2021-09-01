import { makeAutoObservable } from "mobx";

export class SidebarStore {
  opened = true;

  constructor() {
    makeAutoObservable(this);
  }

  show() {
    this.opened = true;
  }

  hide() {
    this.opened = false;
  }

  toggle() {
    if (this.opened) {
      this.hide();
    } else {
      this.show();
    }
  }
}
