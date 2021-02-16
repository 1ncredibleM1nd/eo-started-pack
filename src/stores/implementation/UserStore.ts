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
    async init(data: IUser[]) {
        let users = [];
        for (let index = 0; index < data.length; index++) {
            const user_item: IUser = data[index];
            const initUser: IUser = {
                ...user_item,
            }
            users.push(initUser)
        }
        this.avaliableUsers = users
    }

    @action
    initHero(data: any): void {
        this.hero = data
    };

}

export const userStore = new UserStore()