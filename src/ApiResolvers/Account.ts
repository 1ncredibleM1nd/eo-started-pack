import { API, AUTH } from "../actions/axios";
import { AxiosResponse } from "axios";

export type TApiUser = {
  data: {
    id: number;
    username: string;
    avatar: string | null;
  };
};

export type TApiSchools = {
  data: { [id: string]: { logo: string; schoolName: string } };
};

export default class Account {
  /**
   * @return Promise<AxiosResponse<any>>
   */
  async info() {
    return await API.get<TApiUser>("/account/get-account");
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

  async getSchools() {
    return await API.get<TApiSchools>("/account/get-schools");
  }
}
