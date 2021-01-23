import IUser from './IUser'

export default interface IUserStore {
    hero: IUser,
    avaliableUsers: IUser[];
    getUser: (id: string) => IUser;
    initHero: (data: any) => void;
}