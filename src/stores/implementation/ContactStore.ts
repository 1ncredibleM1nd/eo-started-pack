import { makeAutoObservable } from "mobx";
import $ from "jquery";
import { Conversation } from "../../entities";
import { globalStore } from "..";
import { getConversations } from "@/actions";
import { User } from "@/stores/model/User";
import { reverse, sortBy } from "lodash";

export class ContactStore {
  contacts: Map<number, Conversation> = new Map();
  activeContact?: Conversation;

  search = "";
  filter = {};
  filterSwitch = false;

  constructor() {
    makeAutoObservable(this);
  }

  get activeContactId() {
    return this.activeContact?.id;
  }

  isLoaded = false;
  setLoaded(state: boolean) {
    this.isLoaded = state;
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

  get sortedConversations() {
    return reverse(
      sortBy(Array.from(this.contacts.values()), "lastMessage.timestamp")
    );
  }

  async loadPrev() {
    if (this.pageLoading || !this.hasPrev || this.prevPage === 1) {
      return;
    }

    const firstContact = this.sortedConversations.values().next().value;

    this.setPageLoading(true);

    const { items: conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage - 1,
    });

    this.addContact(conversations);
    this.setPrevPage(page);

    if (firstContact) {
      document
        .getElementById(`contacts_item_${firstContact.id}`)
        ?.scrollIntoView(); // restore scroll position
    }

    this.setHasPrev(page !== 1);
    this.setPageLoading(false);
  }

  async loadNext() {
    if (this.pageLoading || !this.hasNext) {
      return;
    }

    this.setPageLoading(true);

    const { items: conversations, page } = await getConversations({
      schoolIds: globalStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
    });

    this.addContact(conversations);
    this.setNextPage(page);
    this.setHasNext(conversations.length >= 20);
    this.setPageLoading(false);
  }

  addContact(contacts: any[]) {
    for (let contact of contacts) {
      if (!this.contacts.has(contact.id)) {
        this.contacts.set(
          contact.id,
          new Conversation(
            contact.id,
            contact.conversation_source_account_id,
            contact.last_message,
            new User(contact.user[0], contact.name, contact.avatar),
            contact.tags,
            contact.school_id,
            contact.send_file,
            contact.link_social_page,
            contact.readed
          )
        );
      }
    }
  }

  getContact(id: number) {
    if (this.contacts.has(id)) {
      return this.contacts.get(id);
    } else if (this.activeContact?.id === id) {
      return this.activeContact;
    }

    return undefined;
  }

  hasContact(id: number) {
    return this.contacts.has(id) || this.activeContact?.id === id;
  }

  removeContact(id: number) {
    this.contacts.delete(id);
    this.activeContact = undefined;
  }

  async setActiveContact(
    conversation?: Conversation,
    highlightSearchMessage = false
  ) {
    if (conversation?.id !== this.activeContact?.id) {
      this.activeContact = conversation;

      this.activeContact!.chat.setLoaded(false);
      await this.activeContact!.loadMessages(
        1,
        highlightSearchMessage ? conversation?.lastMessage.id : undefined
      );
      this.activeContact!.chat.setLoaded(true);

      document
        .getElementById(`message-${this.activeContact?.chat.messageId}`)
        ?.scrollIntoView({
          block: "center",
        });
    }
  }

  async refetch() {
    this.contacts.clear();
    this.setNextPage(1);
    this.setHasNext(true);
    this.setPrevPage(1);
    this.setHasPrev(false);
    this.setLoaded(false);
    await this.fetch();
  }

  async fetch(id?: number) {
    const { items: conversations, page } = await getConversations({
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

    this.contacts.clear();
    if (conversations.length > 0) {
      this.addContact(conversations);
    }

    this.setLoaded(true);
  }
}

export const contactStore = new ContactStore();
