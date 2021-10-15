import { makeAutoObservable } from "mobx";

export class Manager {
  constructor(id: number, username: string, avatar: string) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.avatar = avatar;
  }

  id: number = -1;
  username: string = "";
  avatar: string = "";
}
