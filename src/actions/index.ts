import * as resolver from "../api/index";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { rootStore } from "@/stores";
import { TConversationDialogStatus } from "@/entities/Conversation";
import { TConversationTaskStatus } from "@/entities/ConversationTask";

function messageError(
  message?: string,
  section: string = "other",
  description?: string
): void {
  console.error(message);
  if (message.indexOf("Network Error") === -1) {
    notification.error({ message, placement: "topRight" });
  }
}

function isError(
  response: AxiosResponse<any>,
  section: string,
  action: string,
  sendMessage: boolean = false
): boolean {
  if (response.data.error === 0) {
    return false;
  }

  const error: { message: string; description: any } = {
    message: response.data.data.error_message ?? action,
    description: undefined,
  };

  if (response.data.data.error_data) {
    error.description = Object.values(response.data.data.error_data);
  }

  messageError(error.message, section, error.description);

  return true;
}

async function getConversations({
  schoolIds,
  page,
  conversationId,
  dialogStatus,
}: {
  schoolIds: number[];
  page?: number;
  conversationId?: number;
  dialogStatus?: TConversationDialogStatus;
}) {
  const action = "Ошибка получения контактов";
  const section = "contacts";

  try {
    const response = await resolver.conversation.conversations({
      filter: {
        tags: rootStore.tagsStore.activeTags.map(({ name }) => name),
        noTags: rootStore.tagsStore.noTags,
        managers: rootStore.managersStore.chosenManagers,
        noManagers: rootStore.managersStore.noManagers,
        sources: rootStore.channelsStore.activeChannels.map(
          (channel) => channel.id
        ),
        schoolIds,
        conversationId,
        dialogStatus,
      },
      search: { query: "" },
      page,
    });

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return { items: [], page: 1 };
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return { items: [], page: 1 };
  }
}

async function getConversation(conversationId: number) {
  const action = "Ошибка получения контактов";
  const section = "contacts";

  try {
    const response = await resolver.conversation.getById(conversationId);

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return [];
  }
}

async function getMessages(
  conversationId: number,
  page: number,
  schoolIds: number[],
  messageId?: number
) {
  const action = "Ошибка получения сообщений";
  const section = "messages";

  try {
    const response = await resolver.conversation.messages(
      schoolIds,
      conversationId,
      page,
      messageId
    );

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return { items: [], page: 1 };
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return { items: [], page: 1 };
  }
}

async function sendMessage(
  conversationId: number,
  message: string,
  conversationSourceAccountId: string,
  schoolIds: Array<number>,
  files: Array<File>,
  replyTo?: number
) {
  const action = "Ошибка отправки сообщения";
  const section = "messages";

  try {
    const response = await resolver.conversation.sendMessage(
      conversationId,
      message,
      conversationSourceAccountId,
      schoolIds,
      files,
      replyTo
    );

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return {};
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return {};
  }
}

async function getUserData() {
  const action = "Ошибка получения аккаунта";
  const section = "auth";

  try {
    let response = await resolver.account.info();

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    messageError(error.toString() ?? action, section);

    return null;
  }
}

async function isLogged() {
  const action = "Ошибка проверки авторизации";
  const section = "auth";

  try {
    let response = await resolver.account.isLogged();

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return {
      success: false,
    };
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return {
      success: false,
    };
  }
}

async function setSession(sessionId: string) {
  const action = "Ошибка установки сессии";
  const section = "auth";

  try {
    let response = await resolver.account.setSession(sessionId);

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }
    return {};
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return {};
  }
}

async function getSchools() {
  const action = "Ошибка получения школ";
  const section = "school";

  try {
    let response = await resolver.account.getSchools();

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return {};
  } catch (error) {
    messageError(error.toString() ?? action, section);

    return {};
  }
}

async function getConversationTasks({
  schoolIds,
  page,
  conversationId,
  taskStatus,
}: {
  schoolIds: number[];
  page?: number;
  conversationId?: number;
  taskStatus?: TConversationTaskStatus;
}) {
  const action = "Ошибка получения списка задач";
  const section = "tasks";

  try {
    const response = await resolver.conversation.conversationTasks({
      filter: {
        tags: rootStore.tagsStore.activeTags.map(({ name }) => name),
        noTags: rootStore.tagsStore.noTags,
        managers: rootStore.managersStore.chosenManagers,
        noManagers: rootStore.managersStore.noManagers,
        sources: rootStore.channelsStore.activeChannels.map(
          (channel) => channel.id
        ),
        schoolIds,
        conversationId,
        taskStatus,
      },
      search: { query: "" },
      page,
    });

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return { items: [], page: 1 };
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return { items: [], page: 1 };
  }
}

export {
  sendMessage,
  getConversations,
  getMessages,
  isLogged,
  setSession,
  getUserData,
  getSchools,
  getConversationTasks,
  getConversation,
};
