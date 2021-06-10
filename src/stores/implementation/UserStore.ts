import { action, observable, reaction } from "mobx";
import { IUserStore, IUser } from "@stores/interface";
import { getUserData } from "@actions";
import { User } from "../../entities";

export class UserStore implements IUserStore {
  @observable hero: User;
  @observable availableUsers: IUser[] = [];

  constructor() {
    reaction(
      () => {
        return this.availableUsers;
      },
      () => {}
    );
  }

  @action
  async initHero() {
    const userData = await getUserData();

    this.hero = new User(userData.id, userData.username, userData.avatar);
  }
}

export const userStore = new UserStore();
