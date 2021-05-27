import { API, AUTH } from "./axios";
import { chatStore, contactStore } from "@stores/implementation";
import qs from "qs";
import * as Sentry from "@sentry/react";

function messageError(
  message?: string,
  section: string = "other",
  description?: string
) {
  Sentry.captureException(new Error(message), {
    tags: {
      section,
    },
    extra: {
      description,
    },
  });
}

async function getConversations(schoolIds: Array<number>, page?: number) {
  let search: any = {
    query: contactStore.search,
    sources: Object.keys(contactStore.sources).filter(
      (key: string) => contactStore.sources[key]
    ),
  };

  let params: any = {
    search,
    page,
    schoolIds,
  };

  try {
    const response = await API.get(`/conversation/get-conversations`, {
      params,
      paramsSerializer: (paramsObject) => {
        return qs.stringify(paramsObject);
      },
    });

    if (response.data.error !== 0) {
      const error: any = {
        message:
          response.data.data.error_message ?? "Ошибка получения контактов",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "contacts", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка получения контактов", "contacts");
    return [];
  }
}

async function getMessages(
  conversationId: string,
  page: number,
  schoolIds: Array<number>
) {
  const params = new URLSearchParams();

  params.set("page", page.toString());
  params.set("conversationId", conversationId);

  schoolIds.forEach((schoolId: number, index: number) => {
    params.set(`schoolIds[${index}]`, schoolId.toString());
  });

  try {
    const response = await API.get(`/conversation/get-messages?${params}`);

    if (response.data.error !== 0) {
      const error: any = {
        message:
          response.data.data.error_message ?? "Ошибка получения сообщений",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "messages", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка получения сообщений", "messages");
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

  try {
    const response = await API.post(`/conversation/send-message`, formData);

    if (response.data.error !== 0) {
      const error: any = {
        message:
          response.data.data.error_message ?? "Ошибка отправки сообщения",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "messages", error.description);
    }
  } catch (error) {
    messageError(error.toString() ?? "Ошибка получения сообщений", "messages");
  }
}

async function getUserData() {
  try {
    let response = await API.get("/account/get-account");

    if (response.data.error !== 0) {
      const error: any = {
        message:
          response.data.data.error_message ?? "Ошибка получения аккаунта",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "auth", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка получения аккаунта", "auth");

    return null;
  }
}

async function isLogged() {
  try {
    let response = await AUTH.get(`/account/is-logged`);

    if (response.data.error !== 0) {
      const error: any = {
        message:
          response.data.data.error_message ?? "Ошибка проверки авторизации",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "auth", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка проверки авторизации", "auth");
    return {
      success: false,
    };
  }
}

async function setSession(sessionId: string) {
  try {
    const formData = new FormData();

    formData.append("encrypted_session_data", sessionId);

    let response = await AUTH.post(`/account/set-session`, formData);

    if (response.data.error !== 0) {
      const error: any = {
        message: response.data.data.error_message ?? "Ошибка установки сессии",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "auth", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка установки сессии", "auth");

    return null;
  }
}

async function getSchools() {
  try {
    let response = await API.get("/account/get-schools");

    if (response.data.error !== 0) {
      const error: any = {
        message: response.data.data.error_message ?? "Ошибка получения школ",
      };

      if (response.data.data.error_data) {
        error.description = Object.values(response.data.data.error_data);
      }

      messageError(error.message, "school", error.description);
    }

    return response.data.data;
  } catch (error) {
    messageError(error.toString() ?? "Ошибка получения школ", "school");

    return {};
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
};
