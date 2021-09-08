import { makeAutoObservable } from "mobx";
import { chatStore, appStore } from "@/stores/implementation";
import { getConversations } from "@/actions";
import $ from "jquery";
import { Conversation } from "../../entities";
import { globalStore } from "..";

export class ContactStore {
  contact: Array<Conversation> = [];
  activeContact: Conversation | null = null;
  search = "";
  name = "";
  filter = {};
  filterSwitch = false;

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
    this.setNextPage(1);
    this.setHasNext(true);
    this.setPrevPage(1);
    this.setHasPrev(false);
    appStore.setLoading(false);
    contactStore.load();
  }

  filterSchools() {
    this.contact = [];
    this.setNextPage(1);
    this.setHasNext(true);
    this.setPrevPage(1);
    this.setHasPrev(false);
    appStore.setLoading(false);
    contactStore.load();
  }

  filterTags() {
    this.contact = [];
    this.setNextPage(1);
    this.setHasNext(true);
    this.setPrevPage(1);
    this.setHasPrev(false);
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

    const firstContact = this.contact[0];

    this.setPageLoading(true);

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage - 1,
    });

    if (conversations.length > 0) {
      this.contact.unshift(
        ...conversations.map((conversation: Conversation) =>
          chatStore.collectChat(conversation)
        )
      );

      this.setPrevPage(page);

      document
        .getElementById(`contacts_item_${firstContact.id}`)
        .scrollIntoView(); // restore scroll position
    }

    this.setHasPrev(page !== 1);
    this.setPageLoading(false);
  }

  async loadNext() {
    if (this.pageLoading || !this.hasNext) {
      return;
    }

    this.setPageLoading(true);

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
    });

    if (conversations.length > 0) {
      this.contact.push(
        ...conversations.map((conversation: Conversation) =>
          chatStore.collectChat(conversation)
        )
      );

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

  hasContact(id: string) {
    return this.contact.some((contact: Conversation) => contact.id == id);
  }

  async setActiveContact(id: string | null) {
    if (this.activeContact && this.activeContact.id === id) {
      return;
    }

    if (this.hasContact(id)) {
      chatStore.isLoaded = false;

      this.activeContact = this.getContact(id);
      chatStore.activeChat = new Conversation(
        this.activeContact.id,
        this.activeContact.contactId,
        this.activeContact.sourceAccountId,
        this.activeContact.activeSocial,
        this.activeContact.user,
        this.activeContact.tags
      );

      await chatStore.loadMessages(chatStore.activeChat.contactId, 1);
      $(".msg_space").animate(
        { scrollTop: $(".msg_space").prop("scrollHeight") },
        0
      );

      chatStore.isLoaded = true;
    } else {
      this.activeContact = null;
      chatStore.activeChat = null;
    }
  }

  async load(id?: string) {
    const dataContact: Conversation[] = [];

    const { conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage,
      conversationId: id,
    });

    this.setPrevPage(page);
    this.setHasPrev(page !== 1);
    if (this.nextPage === 1 && this.nextPage !== page) {
      this.setNextPage(page);
      this.setHasNext(conversations.length >= 20);
    }

    if (!conversations.length) {
      this.contact = [];
      appStore.setLoading(true);
      return;
    }

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
        this.load();
      }
    }, 1000);
  }
}

export const contactStore = new ContactStore();
