import { createContext, useContext, ReactNode } from "react";
import { UsersStore } from "./UsersStore";
import { SchoolsStore } from "./SchoolsStore";
import { ChannelsStore } from "./ChannelsStore";
import { SidebarStore } from "@/stores/SidebarStore";
import { appStore, authStore, contactStore } from "@/stores/implementation";
import { action, makeAutoObservable } from "mobx";
import { TagsStore } from "@/stores/TagsStore";
import { socket } from "@/services/socket";
import $ from "jquery";
import { notification } from "antd";

class RootStore {
  appStore = appStore;
  authStore = authStore;
  contactStore = contactStore;
  sidebarStore = new SidebarStore();
  tagsStore = new TagsStore();
  usersStore = new UsersStore();
  schoolsStore = new SchoolsStore();
  channelsStore = new ChannelsStore();

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
    this.initSocket();
  }

  initSocket() {
    socket.on("connect", () => {
      socket.emit("join", {
        token: this.authStore.getToken(),
      });
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
          contact.read(true);
          $(".msg_space").animate(
            { scrollTop: $(".msg_space").prop("scrollHeight") },
            0
          );
        } else {
          contact.read(data.readed);
        }
      } else {
        if (
          this.tagsStore.activeTags.length === 0 ||
          this.tagsStore.activeTags.some(({ id }) => data.tags.includes(id))
        ) {
          this.contactStore.addContact([data]);
        }
      }
    });

    socket.on("conversationStatus", async ({ conversation_id, readed }) => {
      if (this.contactStore.hasContact(conversation_id)) {
        this.contactStore.getContact(conversation_id)!.read(readed);
      }
    });

    socket.on("tagAdded", (data) => {
      this.tagsStore.add(data.id, data.school_id, data.name);
    });

    socket.on("tagRemoved", (data) => {
      this.tagsStore.delete(data.id);
    });

    socket.on("tagEdited", (data) => {
      this.tagsStore.edit(data.id, data.name);
    });

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

export const globalStore = new RootStore();

export const GlobalStoreContext = createContext(globalStore);

export function useStore(): RootStore {
  return useContext(GlobalStoreContext);
}

export function GlobalStoreProvider({ children }: { children: ReactNode }) {
  return (
    <GlobalStoreContext.Provider value={globalStore}>
      {children}
    </GlobalStoreContext.Provider>
  );
}
