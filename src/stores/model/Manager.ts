import { makeAutoObservable } from "mobx";
import store from "store";

export class Manager {
  constructor(id: number, username: string, avatar: string, selected: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.selected = selected;
  }

  id: number = -1;
  username: string = "";
  avatar: string = "";
  selected: boolean = false;

  setSelected(selected: boolean) {
    this.selected = selected;
    store.set("managers", {
      ...store.get("managers"),
      [this.id]: selected,
    });
  }
}
