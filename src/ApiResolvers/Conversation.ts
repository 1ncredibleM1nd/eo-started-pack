import { API } from "@/actions/axios";
import { AxiosResponse } from "axios";

export default class Conversation {
  conversations(
    query: string,
    tags: string[],
    noTags: boolean,
    sources: Object,
    schoolIds: number[],
    page?: number,
    conversationId?: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-conversations`, {
      search: {
        query,
        sources,
        tags,
        noTags,
        conversationId,
      },
      page,
      schoolIds,
    });
  }

  setTags(conversationId: number, tags: number[]) {
    return API.post("/conversation/set-tags", {
      conversationId,
      tags: tags.length > 0 ? tags : [0],
    });
  }

  messages(
    schoolIds: number[],
    conversationId: number,
    page: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-messages`, {
      page,
      conversationId,
      schoolIds,
    });
  }

  sendMessage(
    conversationId: number,
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

    formData.append("conversationId", conversationId.toString());

    return API.post(`/conversation/send-message`, formData);
  }

  unread(contactId: string): Promise<AxiosResponse<any>> {
    const params = new URLSearchParams();

    params.set("conversationId", contactId);

    return API.get(`/conversation/set-unread-conversation?${params}`);
  }
}
