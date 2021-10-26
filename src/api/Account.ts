import { AxiosResponse } from "axios";
import { RequestBuilder } from "@/api/request-builder";

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
    return RequestBuilder.instance.get<TApiUser>("/account/get-account");
  }

  isLogged() {
    return RequestBuilder.instance.get("v1/account/is-logged");
  }

  setSession(sessionId: string): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    formData.append("encrypted_session_data", sessionId);

    return RequestBuilder.instance.post(`v1/account/set-session`, formData);
  }

  getSchools() {
    return RequestBuilder.instance.get<TApiSchools>("/account/get-schools");
  }
}
