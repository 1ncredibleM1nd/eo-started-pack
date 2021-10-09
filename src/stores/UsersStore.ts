import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { User } from "./model/User";
import { account } from "@/api";

@injectable()
export class UsersStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async init() {
    const { data } = await account.info();
    this.user = new User(data.data.id, data.data.username, data.data.avatar);
  }
}
