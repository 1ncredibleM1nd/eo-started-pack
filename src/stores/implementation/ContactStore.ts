import { makeAutoObservable } from "mobx";
import { chatStore, appStore } from "@/stores/implementation";
import { getConversations } from "@/actions";
import $ from "jquery";
import { Conversation } from "../../entities";
import { globalStore } from "..";

export class ContactStore {
  contact: Array<Conversation> = [];
  activeContact: Conversation;
  search: string = "";
  filterSwitch: boolean = false;

  filter: any;
  name: string;

  constructor() {
    makeAutoObservable(this);
  }

  pageLoading = false;
  setPageLoading(value: boolean) {
    this.pageLoading = value;
  }

  hasNext = true;
  setHasNext(value: boolean) {
    this.hasNext = value;
  }

  hasPrev = true;
  setHasPrev(value: boolean) {
    this.hasPrev = value;
  }

  prevPage: number = 1;
  setPrevPage(page: number) {
    this.prevPage = page;
  }

  nextPage: number = 1;
  setNextPage(page: number) {
    this.nextPage = page;
  }

  toggleFilterSwitch() {
    this.filterSwitch = !this.filterSwitch;
  }

  filterSocial() {
    this.contact = [];
    appStore.setLoading(false);
    contactStore.load();
  }

  setSearch(search: string) {
    this.search = search;
    this.contact = [];
    appStore.setLoading(false);
    contactStore.load();
  }

  async loadPrev() {
    if (this.pageLoading || !this.hasPrev || this.prevPage === 1) {
      return;
    }

    console.log("load prev");
    this.setPageLoading(true);

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage - 1,
    });

    if (conversations.length > 0) {
      this.contact = [
        ...conversations.map((conversation: Conversation) =>
          chatStore.collectChat(conversation)
        ),
        ...this.contact,
      ];

      this.setPrevPage(page);
    }

    this.setHasPrev(page !== 1);
    this.setPageLoading(false);
  }

  async loadNext() {
    if (this.pageLoading || !this.hasNext) {
      return;
    }

    console.log("load next");
    this.setPageLoading(true);

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
    });

    if (conversations.length > 0) {
      this.contact = [
        ...this.contact,
        ...conversations.map((conversation: Conversation) =>
          chatStore.collectChat(conversation)
        ),
      ];

      this.setNextPage(page);
    }

    this.setHasNext(conversations.length >= 20);
    this.setPageLoading(false);
  }

  getContact(id: string) {
    return this.contact.find(
      (contactItem: Conversation) => contactItem.id == id
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

  async load(id?: string) {
    const dataContact: Conversation[] = [];

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage,
      conversationId: id,
    });

    if (!conversations.length) {
      this.contact = [];
      appStore.setLoading(true);
      return;
    }

    this.setPrevPage(page);

    for (let i = 0; i < conversations.length; i++) {
      const contact = conversations[i];
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

    setTimeout(() => {
      if (!this.pageLoading) {
        console.log("load");
        this.load();
      }
    }, 1000);
  }
}

export const contactStore = new ContactStore();
