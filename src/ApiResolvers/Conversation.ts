import { API } from "@/actions/axios";
import { AxiosResponse } from "axios";
import { chatStore } from "@/stores/implementation";

export default class Conversation {
  conversations(
    query: string,
    tags: number[],
    sources: Object,
    schoolIds: number[],
    page?: number,
    conversationId?: string
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-conversations`, {
      search: {
        query,
        sources,
        tags,
        conversationId,
      },
      page,
      schoolIds,
    });
  }

  setTags(conversationId: number, tags: number[]) {
    return API.post("/conversation/set-tags", {
      conversationId,
      tags,
    });
  }

  messages(
    schoolIds: number[],
    conversationId: string,
    page: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-messages`, {
      page,
      conversationId,
      schoolIds,
    });
  }

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

  unread(contactId: string): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    params.set("conversationId", contactId);

    return API.get(`/conversation/set-unread-conversation?${params}`);
  }
}
