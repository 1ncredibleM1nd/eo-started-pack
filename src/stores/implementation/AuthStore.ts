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
    }

    @action
    async initialize() {
        try {
            let data = await isLogged()
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
            let url = urlData(window.location.href)
            // @ts-ignore
            if(url.encrypted_session_data !== undefined){
                // @ts-ignore
                if (url.encrypted_session_data.length !== 0) {
                    // @ts-ignore
                    setSession(url.encrypted_session_data)
                }
            }

            if (!data.success) {
            // window.location.href = `https://account.dev.prodamus.ru/?redirect_url=${window.location.href}`
            } else {
                this.setToken(data.token)
            }
            // let userData = {
            //     username: "Бильбо Бэггинс",
            //     age: '24',
            //     city: 'Москва Россия',
            //     phon: '+7(984)9797979',
            //     avatar: 'https://i.pinimg.com/736x/9a/bd/a5/9abda5b52a61284f7e39101cd84edfd2--hobbit--lord-of-the-rings.jpg',
            //     id: "user_0",
            //     avaliableSocial: {
            //         "whatsapp": true,
            //         "instagram": true,
            //         "vk": true,
            //         "ok": true,
            //         "viber": false,
            //         "facebook": true,
            //         "telegram": true,
            //         "email": true
            //     },
            //     online: {
            //         "whatsapp": 'В сети',
            //         "instagram": '20д',
            //         "vk": '10м',
            //         "ok": '5м',
            //         "facebook": '20м',
            //         "telegram": '2ч',
            //     },
            //     token: 'd/a5/9abda5b52a61284f7e3910a4887d/a5/9abda5b52a61284f7e3910a89s@asd900789'
            //
            // }
            // this.setToken(this.auth0.token)
        } catch (e) {
            throw(e)
        }

        // this.setLoader(false)
    }

}


export const authStore = new AuthStore()