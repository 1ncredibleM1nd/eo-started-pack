import { API } from "@/actions/axios";
import { AxiosResponse } from "axios";
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
    schoolIds: Array<number>,
    page?: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-conversations`, {
      search: {
        query,
        sources,
      },
      page,
      schoolIds,
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
    schoolIds: Array<number>,
    conversationId: string,
    page: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-messages`, {
      page,
      conversationId,
      schoolIds,
    });
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
