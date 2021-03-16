export default interface IAuthStore {
	login: () => void;
	loading?: boolean,
	setLoader: (loading: boolean) => void,
	setToken: (token: string) => void,
	initialize: () => Promise<boolean>,
	checkLogin: () => void;
	isFrame: boolean

}
