import { action, computed, observable, reaction } from 'mobx'
import { IUserStore, IUser } from '@stores/interface';

export class UserStore implements IUserStore {
    @observable hero: IUser;
    @observable avaliableUsers: IUser[] = [];


    constructor() {
        reaction(() => {
            return this.avaliableUsers;
        }, () => {
            if (true) {
            }
        })
    }

    @action
    initHero(data: any) {
        this.hero = data
    };

}

export const userStore = new UserStore()