import { makeAutoObservable } from "mobx";

export class User {
  id: number;
  username: string;
  avatar: string | null;

  constructor(id: number, username: string, avatar: string | null) {
    makeAutoObservable(this);
    this.id = id;
    this.username = username;
    this.avatar = avatar;
  }
}
