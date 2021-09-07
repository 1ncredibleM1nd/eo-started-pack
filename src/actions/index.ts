import { contactStore } from "@/stores/implementation";
import * as resolver from "../ApiResolvers/index";
import { AxiosResponse } from "axios";
import { notification } from "antd";
import { globalStore } from "@/stores";

/**
 *
 * @param message
 * @param section
 * @param description
 *
 * @return void
 */
function messageError(
  message?: string,
  section: string = "other",
  description?: string
): void {
  console.error(message);
  notification.error({ message, placement: "topRight" });
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
}: {
  schoolIds: number[];
  page?: number;
  conversationId?: string;
}) {
  const action = "Ошибка получения контактов";
  const section = "contacts";

  try {
    const sources = globalStore.channelsStore.activeChannels.map(
      (channel) => channel.id
    );

    const tags = globalStore.tagsStore.activeTags.map(({ id }) => id);

    const response = await resolver.conversation.conversations(
      contactStore.search,
      tags,
      globalStore.tagsStore.noTags,
      sources,
      schoolIds,
      page,
      conversationId
    );

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return { conversations: [], page: 1 };
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return { conversations: [], page: 1 };
  }
}

async function getMessages(
  conversationId: string,
  page: number,
  schoolIds: number[]
) {
  const action = "Ошибка получения сообщений";
  const section = "messages";

  try {
    const response = await resolver.conversation.messages(
      schoolIds,
      conversationId,
      page
    );

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return [];
  }
}

async function sendMessage(
  conversationId: string,
  message: string,
  conversationSourceAccountId: string,
  schoolIds: Array<number>,
  files: Array<File>,
  replyTo: string
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

    isError(response, section, action, true);
  } catch (error) {
    messageError(error.toString() ?? action, section);
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

async function setUnreadChat(contactId: string) {
  const action = "Ошибка: не удалось отметить чат, как непрочитанный";
  const section = "messages";

  try {
    const response = await resolver.conversation.unread(contactId);

    if (!isError(response, section, action, true)) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    messageError(error.toString() ?? action, section);
    return [];
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
  setUnreadChat,
};
