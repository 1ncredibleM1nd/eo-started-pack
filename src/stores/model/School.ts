import store from "store";
import { makeAutoObservable } from "mobx";

export class School {
  id: number;
  logo: string;
  name: string;
  active: boolean;

  constructor(id: number, logo: string, name: string, active: boolean) {
    makeAutoObservable(this);
    this.id = id;
    this.logo = logo;
    this.name = name;
    this.active = active;
  }

  setActive(active: boolean) {
    this.active = active;

    store.set("schools", {
      ...store.get("schools", {}),
      [this.id]: active,
    });
  }
}
