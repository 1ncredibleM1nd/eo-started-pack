export default interface IAuthStore {
	login: () => void,
	loading?: boolean,
	setLoader: (loading: boolean) => void,
	setToken: (token: string) => void,
	getToken: () => string,
	setTimestamp: (timestamp: string) => void,
	getTimestamp: () => string,
	setUserId: (userId: string) => void,
	getUserId: () => string,
	initialize: () => Promise<boolean>,
	checkLogin: () => void,
	isFrame: boolean,
	token: string,
	userId?: string,
	timestamp?: string
}
