import IUser from './IUser'

export default interface IUserStore {
    hero: IUser,
    avaliableUsers: IUser[]
    initHero: () => void;
}