import IUser from './IUser'

export default interface IUserStore {
    hero: IUser,
    avaliableUsers: IUser[];
    init: (data: IUser[]) => void;
    getUser: (id: string) => IUser;
    initHero: (data: any) => void;
}