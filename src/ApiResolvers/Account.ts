import { API, AUTH } from "../actions/axios";
import { AxiosResponse } from "axios";

export default class Account {
  /**
   * @return Promise<AxiosResponse<any>>
   */
  info(): Promise<AxiosResponse<any>> {
    return API.get("/account/get-account");
  }

  /**
   * @return Promise<AxiosResponse<any>>
   */
  isLogged(): Promise<AxiosResponse<any>> {
    return AUTH.get(`/account/is-logged`);
  }

  /**
   * @param sessionId
   * @return Promise<AxiosResponse<any>>
   */
  setSession(sessionId: string): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    formData.append("encrypted_session_data", sessionId);

    return AUTH.post(`/account/set-session`, formData);
  }
  getSchools(): Promise<AxiosResponse<any>> {
    return API.get("/account/get-schools");
  }
}
