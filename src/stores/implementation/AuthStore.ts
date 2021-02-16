import {action, observable} from 'mobx'
import {isLogged, setSession} from '@actions'
import IAuthStore from "@stores/interface/app/IAuthStore";

export class AuthStore implements IAuthStore {

    @observable loading: boolean = false
    @observable auth0: any = {}

    @action
    setLoader(loading: boolean) {
        this.loading = loading;
    }

    @action
    setToken(token: string) {
        localStorage.setItem('token', token)
    }

    getToken() {
        return localStorage.getItem('token');
        // let paramsString = document.location.search;
        // let searchParams = new URLSearchParams(paramsString);
        //
        // let encrypted_session_data = searchParams.get('encrypted_session_data');
        //
        // if (encrypted_session_data) {
        //     await setSession(encrypted_session_data);
        // }
        //
        // let logged_res = await isLogged();
        //
        // if (!logged_res.data.data.success && !encrypted_session_data) {
        //     window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`;
        // }
    }


    @action
    async initialize() {
        try {
            const currentUrl = new URL(location.href);

            if (currentUrl.search.includes('encrypted_session_data')) {
                const encryptedSessionData = currentUrl.searchParams.get('encrypted_session_data');
                currentUrl.searchParams.delete('encrypted_session_data');
                history.replaceState(history.state, null, currentUrl.href);
                if (encryptedSessionData) {
                    await setSession(encryptedSessionData);
                }
            }
            let urlData = (url: string) => {
                let params = {};
                let param = url.slice(url.indexOf("?"))
                let query = param.substring(1);
                let vars = query.split('&');
                for (let i = 0; i < vars.length; i++) {
                    let pair = vars[i].split('=');
                    params[pair[0]] = decodeURIComponent(pair[1]);
                }
                return params;
            };
            // @ts-ignore
            let url = urlData(window.location.href).encrypted_session_data


            if (url !== undefined  && url.length !==0) {
                const {data: {data: {token}}} = await setSession(url.encrypted_session_data)
                    // @ts-ignore
                    this.setToken(token)
            } else {
                const {data: {data: {token, success}}} = await isLogged()
                let local_toke = localStorage.getItem('token')
                if (!success) {
                    if (!local_toke || local_toke !== token) window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
                } else {
                    this.setToken(token)
                }
            }
        } catch (e) {
            throw(e)
        }
    }

}


export const authStore = new AuthStore()