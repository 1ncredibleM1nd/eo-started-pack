import IUser from './IUser'

export default interface IUserStore {
	hero: IUser,
	availableUsers: IUser[];
	initHero: (data: any) => void;
}
