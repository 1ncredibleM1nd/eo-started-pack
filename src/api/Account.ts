import { API } from "@/api/axios";
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

export class Account {
  info() {
    return API.get<TApiUser>("/account/get-account");
  }

  isLogged() {
    return API.get("v1/account/is-logged");
  }

  setSession(sessionId: string): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    formData.append("encrypted_session_data", sessionId);

    return API.post(`v1/account/set-session`, formData);
  }

  getSchools() {
    return API.get<TApiSchools>("/account/get-schools");
  }
}
