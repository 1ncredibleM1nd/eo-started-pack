import { container } from "tsyringe";
import { createContext, useContext, ReactNode } from "react";
import { UsersStore } from "./UsersStore";
import { SchoolsStore } from "./SchoolsStore";
import { ChannelsStore } from "./ChannelsStore";
import { SidebarStore } from "@/stores/SidebarStore";
import { authStore, contactStore } from "@/stores/implementation";
import { action, makeAutoObservable } from "mobx";
import { TagsStore } from "@/stores/TagsStore";
import { TemplateAnswersStore } from "@/stores/TemplateAnswersStore";
import { socket } from "@/services/socket";
import $ from "jquery";
import { notification } from "antd";
import { SearchStore } from "./SearchStore";
import { LayoutStore } from "./LayoutStore";
import { ManagersStore } from "@/stores/ManagersStore";

class RootStore {
  authStore = authStore; // TODO: wrap with di container
  contactStore = contactStore; // TODO: wrap with di container
  layoutStore = container.resolve(LayoutStore);
  sidebarStore = container.resolve(SidebarStore);
  tagsStore = container.resolve(TagsStore);
  usersStore = container.resolve(UsersStore);
  schoolsStore = container.resolve(SchoolsStore);
  channelsStore = container.resolve(ChannelsStore);
  searchStore = container.resolve(SearchStore);
  templateAnswersStore = container.resolve(TemplateAnswersStore);
  managersStore = container.resolve(ManagersStore);

  constructor() {
    makeAutoObservable(this, {
      init: action.bound,
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
