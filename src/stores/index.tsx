import $ from "jquery";
import { createContext, useContext, ReactNode } from "react";
import { action, makeAutoObservable } from "mobx";
import { notification } from "antd";
import { API } from "@/api/axios";
import { socket } from "@/api/socket";
import { UsersStore } from "@/stores/UsersStore";
import { SchoolsStore } from "@/stores/SchoolsStore";
import { ChannelsStore } from "@/stores/ChannelsStore";
import { SidebarStore } from "@/stores/SidebarStore";
import { AuthStore } from "@/stores/AuthStore";
import { SearchStore } from "@/stores/SearchStore";
import { LayoutStore } from "@/stores/LayoutStore";
import { ManagersStore } from "@/stores/ManagersStore";
import { TaskStore } from "@/stores/TaskStore";
import { contactStore } from "@/stores/ContactStore";
import { TagsStore } from "@/stores/TagsStore";

class RootStore {
  contactStore = contactStore; // TODO: wrap with di container
  taskStore = new TaskStore(this);
  authStore = new AuthStore();
  layoutStore = new LayoutStore();
  sidebarStore = new SidebarStore();
  tagsStore = new TagsStore(this);
  usersStore = new UsersStore();
  schoolsStore = new SchoolsStore();
  channelsStore = new ChannelsStore();
  searchStore = new SearchStore(this);
  managersStore = new ManagersStore();

  constructor() {
    makeAutoObservable(this, {
      init: action.bound,
    });

    this.setupApi();
  }

  setupApi() {
    API.interceptors.request.use((request) => {
      if (
        request.url?.includes("v1/account/is-logged") ||
        request.url?.includes("v1/account/set-session")
      ) {
        return request;
      }

      if (request.headers) {
        request.headers[
          "Authorization"
        ] = `Bearer ${this.authStore.getToken()}`;

        if (this.authStore.isFrame) {
          request.headers["Timestamp"] = this.authStore.getTimestamp();
          request.headers["User"] = this.authStore.getUserId();
          request.headers["RentId"] = this.authStore.getRentId();
        }

        request.url = `${this.authStore.isFrame ? "rest" : "v1"}${request.url}`;
      }

      return request;
    });
  }

  async init() {
    notification.config({ placement: "bottomRight", bottom: 50, duration: 3 });
    await this.usersStore.init();
    await Promise.all([this.channelsStore.init(), this.schoolsStore.init()]);
    await this.tagsStore.load(this.schoolsStore.activeSchoolsIds);
    await this.managersStore.load(this.schoolsStore.activeSchoolsIds);
    this.initSocket();
  }

  initSocket() {
    socket.on("connect", () => {
      const token = this.authStore.getToken();
      socket.emit(
        "join",
        this.authStore.isFrame
          ? {
              token,
              isFrame: {
                rentId: this.authStore.getRentId(),
                userId: this.usersStore.user?.id,
              },
            }
          : { token }
      );
    });

    socket.on("joined", async () => {
      const query = new URLSearchParams(window.location.search);
      await this.contactStore.fetch(Number(query.get("im")));
      await this.taskStore.fetch();
    });

    socket.on("conversation", async (data) => {
      if (this.contactStore.hasContact(data.id)) {
        const contact = this.contactStore.getContact(data.id)!;
        contact.addMessage(data.last_message);

        if (this.contactStore.activeContactId === data.id) {
          contact.setDialogStatus("");
          $(".msg_space").animate(
            { scrollTop: $(".msg_space").prop("scrollHeight") },
            0
          );
        } else {
          contact.setDialogStatus(data.dialog_status);
        }
      } else {
        const hasSchools = this.schoolsStore.activeSchoolsIds.includes(
          data.school_id
        );

        const hasSources = this.channelsStore.activeChannels.some(
          (channel) => channel.id === data?.last_message?.social_media
        );

        const hasTags =
          this.tagsStore.activeTags.length === 0 ||
          this.tagsStore.activeTags.some(({ id }) => data.tags.includes(id));

        if (hasSchools && hasSources && hasTags) {
          this.contactStore.addContact([data]);
        }
      }
    });

    socket.on(
      "conversationDialogStatus",
      async ({ conversation_id, dialog_status }) => {
        if (this.contactStore.hasContact(conversation_id)) {
          this.contactStore
            .getContact(conversation_id)!
            .setDialogStatus(dialog_status);
        }
      }
    );

    socket.on("tagsDialogApplying", (data) => {
      if (this.contactStore.hasContact(data.conversation_id)) {
        this.contactStore
          .getContact(data.conversation_id)!
          .setTags(data.tags ?? []);
      }
    });

    socket.on("messageRemoved", async ({ conversation_id, message_id }) => {
      if (this.contactStore.hasContact(conversation_id)) {
        this.contactStore
          .getContact(conversation_id)!
          .removeMessage(message_id);
      }
    });

    socket.connect();
  }
}

export type RootStoreInstance = InstanceType<typeof RootStore>;

export const rootStore = new RootStore();

export const RootStoreContext = createContext(rootStore);

export function useStore(): RootStore {
  return useContext(RootStoreContext);
}

export function RootStoreProvider({ children }: { children: ReactNode }) {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}
