import { makeAutoObservable } from "mobx";
import { getUserData } from "@/actions";
import { User } from "../../entities";

export class UserStore {
  hero: User;

  constructor() {
    makeAutoObservable(this);
  }

  async initHero() {
    const userData = await getUserData();

    this.hero = new User(userData.id, userData.username, userData.avatar);
  }
}

export const userStore = new UserStore();
