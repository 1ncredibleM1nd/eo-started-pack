import { makeAutoObservable } from "mobx";
import { chatStore, appStore } from "@/stores/implementation";
import { getConversations } from "@/actions";
import $ from "jquery";
import { Conversation } from "../../entities";
import * as store from "store";
import { globalStore } from "..";

export class ContactStore {
  contact: Array<Conversation> = [];
  activeContact: Conversation;
  search: string = "";
  filterSwitch: boolean = false;

  contactLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  filter: any;
  name: string;

  toggleFilterSwitch() {
    this.filterSwitch = !this.filterSwitch;
  }

  filterSocial() {
    this.contact = [];
    appStore.setLoading(false);
    appStore.updateContact();
  }

  setSearch(search: string) {
    this.search = search;
    this.contact = [];
    appStore.setLoading(false);
    appStore.updateContact();
  }

  async loadContact(): Promise<any> {
    if (this.contactLoading) {
      return null;
    }

    this.contactLoading = true;

    let conversations = await getConversations(
      globalStore.schoolsStore.activeSchoolsIds,
      appStore.activeContactPageNumber + 1
    );

    let dataContact: any = [];
    if (!conversations.length) {
      this.contactLoading = false;
      return;
    }

    for (let i = 0; i < conversations.length; i++) {
      const conversation: Conversation = chatStore.collectChat(
        conversations[i]
      );
      dataContact.push(conversation);
    }

    this.contact = [...this.contact, ...dataContact];

    if (conversations.length === 20) {
      setTimeout(() => {
        appStore.setContactPageNumber(appStore.activeContactPageNumber + 1);

        this.contactLoading = false;
      }, 500);
    }
  }

  getContact(id: string) {
    return this.contact.find(
      (contactItem: Conversation) => contactItem.id === id
    );
  }

  async setActiveContact(id: string) {
    if (this.activeContact && this.activeContact.id === id) {
      return;
    }

    chatStore.isLoaded = false;

    if (id) {
      this.activeContact = this.getContact(id);
      chatStore.activeChat = new Conversation(
        this.activeContact.id,
        this.activeContact.contactId,
        this.activeContact.sourceAccountId,
        this.activeContact.activeSocial,
        this.activeContact.user
      );

      await chatStore.loadMessages(chatStore.activeChat.contactId, 1);
      $(".msg_space").animate(
        { scrollTop: $(".msg_space").prop("scrollHeight") },
        0
      );
    } else {
      this.activeContact = null;
      chatStore.activeChat = null;
    }

    chatStore.isLoaded = true;
  }

  async init(data: any) {
    const dataContact: Array<Conversation> = [];

    if (!data.length) {
      this.contact = [];
      appStore.setLoading(true);
      return;
    }

    for (let i = 0; i < data.length; i++) {
      const contact = data[i];
      const conversation: Conversation = chatStore.collectChat(contact);
      dataContact.push(conversation);
    }

    if (JSON.stringify(this.contact) !== JSON.stringify(dataContact)) {
      for (let i = 0; i < this.contact.length; i++) {
        const localContact = this.contact[i];

        let serverContact = dataContact[i];

        if (!serverContact) {
          continue;
        }

        // Проверка на последнее сообщение, если оно не соответствует старому - загрузить новые сообщения
        if (this.activeContact && this.activeContact.id === localContact.id) {
          if (
            localContact.getLastMessage().id !==
              serverContact.getLastMessage().id &&
            serverContact.getLastMessage().timestamp >
              localContact.getLastMessage().timestamp
          ) {
            await chatStore.loadMessages(this.activeContact.id, 1);

            setTimeout(() => {
              $(".msg_space").animate(
                { scrollTop: $(".msg_space").prop("scrollHeight") },
                0
              );
            });
          }
        }
      }

      if (this.contact.length) {
        // Замена первых 20 контактов
        for (let i = 0; i <= 19; i++) {
          this.contact[i] = dataContact[i];
        }
      } else {
        this.contact = dataContact;
      }
    }

    appStore.setLoading(true);
  }
}

export const contactStore = new ContactStore();
