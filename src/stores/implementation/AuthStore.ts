import { action, observable, makeObservable } from "mobx";
import { isLogged, setSession } from "@actions";
import IAuthStore from "@stores/interface/app/IAuthStore";
import { userStore } from "@stores/implementation/UserStore";

export class AuthStore implements IAuthStore {
  checkLogin: () => void;
  loading: boolean = false;
  isFrame: boolean = false;
  token: string;
  userId: string;
  timestamp: string;

  constructor() {
    makeObservable(this, {
      loading: observable,
      isFrame: observable,
      token: observable,
      userId: observable,
      timestamp: observable,
      setLoader: action,
      setToken: action,
      getToken: action,
      setTimestamp: action,
      getTimestamp: action,
      setUserId: action,
      getUserId: action,
      checkIsFrame: action,
      login: action,
      initialize: action,
    });
  }

  setLoader(loading: boolean) {
    this.loading = loading;
  }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setTimestamp(timestamp: string) {
    this.timestamp = timestamp;
  }

  getTimestamp() {
    return this.timestamp;
  }

  setUserId(userId: string) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  checkIsFrame() {
    if (localStorage.getItem("isTest")) {
      this.isFrame = false;
      return;
    }
    this.isFrame = window.self !== window.top;
  }

  async login() {
    if (!this.isFrame) {
      const currentUrl = new URL(window.location.href);
      let encryptedSessionData: any;

      if (currentUrl.searchParams.has("encrypted_session_data")) {
        encryptedSessionData = currentUrl.searchParams.get(
          "encrypted_session_data"
        );
        const setSessionData = await setSession(encryptedSessionData);

        this.setToken(setSessionData.token);

        currentUrl.searchParams.delete("encrypted_session_data");
        currentUrl.searchParams.delete("pid");

        window.history.replaceState(
          window.history.state,
          null,
          currentUrl.href
        );
      } else {
        const loggedData = await isLogged();

        if (loggedData.success) {
          this.setToken(loggedData.token);

          await userStore.initHero();
        } else {
          window.location.href = `${process.env.APP_AUTH_URL}/?redirect_url=${window.location.href}`;
        }
      }
    }
  }

  async initialize(): Promise<boolean> {
    const currentUrl = new URL(window.location.href);

    this.checkIsFrame();

    if (this.isFrame) {
      let encrypted_data = currentUrl.searchParams.get("encrypted_data");
      let decrypted_data = atob(encrypted_data).split("_");

      this.setTimestamp(decrypted_data[0]);
      this.setUserId(decrypted_data[1]);
      this.setToken(decrypted_data[2]);
    }

    await this.login();

    return true;
  }
}

export const authStore = new AuthStore();
