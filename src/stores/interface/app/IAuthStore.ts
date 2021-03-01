export default interface IAuthStore {
	loading?: boolean,
	url_iFrame?: string,
	isFramed?: boolean,
	setLoader: (loading: boolean) => void,
	setToken: (token: string) => void,
	getToken: () => void,
	initialize: () => void,
	
}
