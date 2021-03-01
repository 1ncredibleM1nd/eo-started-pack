import {action, observable} from 'mobx'
import {isLogged, setSession, getUserData} from '@actions'
import {getFrame} from '../../actions/axios'
import IAuthStore from "@stores/interface/app/IAuthStore";

window.addEventListener('focus', async () => {
    await isLogged()
});

export class AuthStore implements IAuthStore {
    @observable loading: boolean = false
    @observable url_iFrame: string
    @observable isFramed: boolean

    @action
    setLoader(loading: boolean) {
        this.loading = loading;
    }

    @action
    setToken(token: string) {
        localStorage.setItem('token', token)
    }

    getToken = () => localStorage.getItem('token');

    @action
    async initialize() {
        try {
            const currentUrl = new URL(location.href);
            if (currentUrl.search.includes('encrypted_data')) {
                this.url_iFrame = currentUrl.searchParams.get('encrypted_data');
            }
            this.isFramed = await getFrame(this.url_iFrame)
            if (!this.isFramed) {
                let urlData = (url: string) => {
                    let params = {};
                    let param = url.slice(url.indexOf("?"))
                    let query = param.substring(1);
                    let vars = query.split('&');
                    for (let i = 0; i < vars.length; i++) {
                        let pair = vars[i].split('=');
                        params[pair[0]] = decodeURIComponent(pair[1]);
                    }
                    return params
                };
                // @ts-ignore
                let url = await urlData(window.location.href).encrypted_session_data
                if (currentUrl.search.includes('encrypted_session_data')) {
                    const encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data');
                    currentUrl.searchParams.delete('encrypted_session_data');
                    currentUrl.searchParams.delete('pid');
                    history.replaceState(history.state, null, currentUrl.href);
                    if (encryptedSessionData) {
                        await setSession(encryptedSessionData);
                    }
                }
                if (url !== undefined && url.length !== 0) {
                    const {data: {data: {token}}} = await setSession(url)
                    this.setToken(token)
                    await getUserData()
                } else {
                    const {data: {data: {token, success}}} = await isLogged()
                    let local_toke = localStorage.getItem('token')
                    if (!success) {
                        if (!local_toke || local_toke !== token) window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
                    } else {
                        this.setToken(token)
                        await getUserData()
                    }
                }
            }

        } catch (e) {
            throw(e)
        }
    }

}


export const authStore = new AuthStore()
