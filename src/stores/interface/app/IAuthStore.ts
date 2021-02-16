export default interface IAuthStore {
    loading?: boolean,
    auth0?: any,
    setLoader: (loading: boolean) => void,
    setToken: (token: string) => void,
    getToken: () => void,
    initialize: () => void,

}