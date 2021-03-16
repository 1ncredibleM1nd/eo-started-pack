export default interface IAuthStore {
	login();
	loading?: boolean,
	setLoader: (loading: boolean) => void,
	setToken: (token: string) => void,
	initialize: () => Promise<boolean>,
	checkLogin: () => void;
	isFrame: boolean

}
