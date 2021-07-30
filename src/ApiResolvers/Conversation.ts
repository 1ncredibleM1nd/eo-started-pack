import { API } from "@/actions/axios";
import { AxiosResponse } from "axios";
import qs from "qs";
import { chatStore } from "@/stores/implementation";

export default class Conversation {
  /**
   * @param query
   * @param sources
   * @param schoolIds
   * @param page
   *
   * @return Promise<AxiosResponse<any>>
   */
  conversations(
    query: string,
    sources: Object,
    schoolIds: Array<string>,
    page?: number
  ): Promise<AxiosResponse<any>> {
    let params: any = {
      search: {
        query,
        sources,
      },
      page,
      schoolIds,
    };

    return API.get(`/conversation/get-conversations`, {
      params,
      paramsSerializer: (paramsObject) => {
        return qs.stringify(paramsObject);
      },
    });
  }

  /**
   * Получить сообщения
   * @param schoolIds
   * @param conversationId
   * @param page
   *
   * @return Promise<AxiosResponse<any>>
   */
  messages(
    schoolIds: Array<string>,
    conversationId: string,
    page: number
  ): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    params.set("page", page.toString());
    params.set("conversationId", conversationId);

    schoolIds.forEach((schoolId: string, index: number) => {
      params.set(`schoolIds[${index}]`, schoolId);
    });

    return API.get(`/conversation/get-messages?${params}`);
  }

  /**
   * @param conversationId
   * @param message
   * @param conversationSourceAccountId
   * @param schoolIds
   * @param files
   * @param replyTo
   *
   * @return Promise<AxiosResponse<any>>
   */
  sendMessage(
    conversationId: string,
    message: string,
    conversationSourceAccountId: string,
    schoolIds: Array<number>,
    files: Array<File>,
    replyTo: string
  ): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append(`files[]`, files[i], files[i].name);
    }

    formData.append("message", message);
    formData.append("conversationSourceAccountId", conversationSourceAccountId);

    schoolIds.forEach((schoolId: number, index: number) => {
      formData.append(`schoolIds[${index}]`, schoolId.toString());
    });

    if (replyTo) {
      formData.append("replyTo", replyTo.toString());
    }

    formData.append("conversationId", chatStore.activeChat.id);

    return API.post(`/conversation/send-message`, formData);
  }
}
