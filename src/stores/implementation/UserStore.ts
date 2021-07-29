import { action, observable, reaction, makeObservable } from "mobx";
import { IUser } from "@/stores/interface";
import { getUserData } from "@/actions";
import { User } from "../../entities";

export class UserStore {
  hero: User;
  availableUsers: IUser[] = [];

  constructor() {
    makeObservable(this, {
      hero: observable,
      availableUsers: observable,
      initHero: action,
    });
  }

  async initHero() {
    const userData = await getUserData();

    this.hero = new User(userData.id, userData.username, userData.avatar);
  }
}

export const userStore = new UserStore();
