import { API } from "@/actions/axios";
import { TConversationDialogStatus } from "@/entities/Conversation";
import { AxiosResponse } from "axios";

type TGetConversationsFilter = {
  tags: string[];
  noTags: boolean;
  managers: number[];
  noManagers: boolean;
  sources: Object;
  schoolIds: number[];
  conversationId?: number;
  dialogStatus?: TConversationDialogStatus;
};

type TGetConversationsSearch = {
  query: string;
};

type TGetConversations = {
  filter: TGetConversationsFilter;
  search: TGetConversationsSearch;
  page?: number;
};

export default class Conversation {
  conversations({
    filter,
    search,
    page,
  }: TGetConversations): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-conversations`, {
      filter,
      search,
      page,
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
    page: number,
    messageId?: number
  ): Promise<AxiosResponse<any>> {
    return API.post(`/conversation/get-messages`, {
      page,
      conversationId,
      messageId,
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

  setManager(id: number, managerId: number | null) {
    return API.post("/conversation/set-manager", {
      conversationId: id,
      managerId: managerId,
    });
  }

  setDialogStatus(id: number, status: TConversationDialogStatus) {
    return API.post("/conversation/set-conversation-status", {
      conversationId: id,
      status,
    });
  }

  // Tasks queries

  createTask(id: number, content: string, timeUp: Date) {
    return API.post("/conversation/create-task", {
      conversationId: id,
      content,
      timestampDateToComplete: timeUp,
    });
  }

  async setStatusTask(id: number, status: string) {
    return API.post("/conversation/set-status-task", {
      conversationTaskId: id,
      status,
    });
  }
}
