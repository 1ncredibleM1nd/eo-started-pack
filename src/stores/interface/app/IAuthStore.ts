export default interface IAuthStore {
    loading?: boolean,
    auth0?: any,
    url_iFrame?: string,
    isFramed?: boolean,
    setLoader: (loading: boolean) => void,
    setToken: (token: string) => void,
    getToken: () => void,
    initialize: () => void,

}