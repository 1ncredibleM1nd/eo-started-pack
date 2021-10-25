import { makeAutoObservable } from "mobx";
import { isLogged, setSession } from "@/actions";
import { rootStore } from "./index";

export class AuthStore {
  loading = false;
  isFrame = false;
  token = "";
  userId = "";
  timestamp = "";
  rentId = "";

  constructor() {
    makeAutoObservable(this);
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

  setRentId(rentId: string) {
    this.rentId = rentId;
  }

  getRentId() {
    return this.rentId;
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
        const { token } = await setSession(encryptedSessionData);

        this.setToken(token);

        currentUrl.searchParams.delete("encrypted_session_data");
        currentUrl.searchParams.delete("pid");

        window.history.replaceState(
          window.history.state,
          // @ts-ignore forgive me for that
          null,
          currentUrl.href
        );
      } else {
        const { success, token } = await isLogged();

        if (success) {
          let oldToken = this.getToken();

          if (oldToken) {
            this.setToken(token);
          } else {
            window.location.href = `${
              import.meta.env.VITE_APP_AUTH_URL
            }/v1/user/check-authentication-redirect?redirect_url=${
              window.location.href
            }`;
          }

          this.setToken(token);
          await rootStore.usersStore.init();
        } else {
          window.location.href = `${
            import.meta.env.VITE_APP_ACCOUNT_URL
          }/?redirect_url=${window.location.href}`;
        }
      }
    }
  }

  async initialize(): Promise<boolean> {
    const currentUrl = new URL(window.location.href);

    this.checkIsFrame();

    if (this.isFrame) {
      let encrypted_data = currentUrl.searchParams.get("encrypted_data");
      // @ts-ignore forgive me for that
      let decrypted_data = atob(encrypted_data).split("_");

      this.setTimestamp(decrypted_data[0]);
      this.setRentId(decrypted_data[1]);
      this.setUserId(decrypted_data[2]);
      this.setToken(decrypted_data[3]);
    }

    await this.login();

    return true;
  }
}
