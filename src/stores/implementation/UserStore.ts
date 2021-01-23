import { action, observable, reaction } from 'mobx'
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
    getUser(id: string) {
        return this.avaliableUsers.find(u => u.id === id)
    }

    @action
    initHero(data: any): void {
        this.hero = data
    };

}

export const userStore = new UserStore()