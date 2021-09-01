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
    this.opened = !this.opened;
  }
}
