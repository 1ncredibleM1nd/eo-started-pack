import { makeAutoObservable } from "mobx";
import {
  Task,
  User,
  Conversation,
  TConversationDialogStatus,
} from "@/stores/model";
import { Api } from "@/api";
import { rootStore } from "./index";
import { getConversations, getConversation } from "@/api/deprecated";
import { reverse, sortBy } from "lodash-es";
import { socket } from "@/api/socket";
import { TTask } from "@/api/types";

export class ContactStore {
  contacts: Map<number, Conversation> = new Map();
  activeContact?: Conversation;
  dialogStatus: TConversationDialogStatus = ""; // use for all

  constructor() {
    makeAutoObservable(this);

    socket.on("conversationTaskAdded", (data: TTask) => {
      this.activeContact?.tasks.set(data.id, new Task(data));
    });

    socket.on("conversationTaskRemoved", (data: TTask) => {
      this.activeContact?.tasks.delete(data.id);
    });

    socket.on("conversationTaskEdited", (data: TTask) => {
      this.activeContact?.tasks.set(data.id, new Task(data));
    });
  }

  get activeContactId() {
    return this.activeContact?.id;
  }

  changeManager(managerId: number) {
    this.activeContact?.changeManager(managerId);
  }

  async createTask({
    content,
    timestampDateToComplete,
  }: {
    content: string;
    timestampDateToComplete: number;
  }) {
    const { data } = await Api.conversation.createTask(
      this.activeContact?.id ?? -1,
      content,
      timestampDateToComplete
    );
  }

  async completeTask(id: number) {
    await Api.conversation.setStatusTask(id, "completed");
  }

  async restoreTask(id: number) {
    await Api.conversation.setStatusTask(id, "active");
  }

  async deleteTask(id: number) {
    await Api.conversation.setStatusTask(id, "archived");
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
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage - 1,
      dialogStatus: this.dialogStatus,
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
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
      page: this.nextPage + 1,
      dialogStatus: this.dialogStatus,
    });

    this.addContact(conversations);
    this.setNextPage(page);
    this.setHasNext(conversations.length >= 20);
    this.setPageLoading(false);
  }

  addContact(contacts: any[]) {
    for (let contact of contacts) {
      if (!this.contacts.has(contact.id)) {
        //Todo correction of manager with unknown id
        const manager = rootStore.managersStore.getById(contact.manager_id);
        if (!manager) {
          contact.manager_id = null;
        }

        this.contacts.set(
          contact.id,
          new Conversation({
            id: contact.id,
            sourceAccountId: contact.conversation_source_account_id,
            lastMessage: contact.last_message,
            user: new User(contact.user[0], contact.name, contact.avatar),
            tags: contact.tags,
            schoolId: contact.school_id,
            sendFile: contact.send_file,
            linkSocialPage: contact.link_social_page,
            dialogStatus: contact.dialog_status,
            restrictions: contact.restrictions,
            manager_id: contact.manager_id,
            tasks: contact.tasks,
          })
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

  async loadContact(id: number) {
    if (this.contacts.has(id)) {
      return this.contacts.get(id);
    } else {
      const conversation = await getConversation(id);
      this.addContact([conversation]);
      return this.contacts.get(id);
    }
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
    const needUpdate =
      conversation?.id !== this.activeContact?.id || highlightSearchMessage;
    if (needUpdate) {
      this.activeContact = conversation;
      this.activeContact?.chat.setLoaded(false);

      await this.activeContact?.loadMessages(
        1,
        highlightSearchMessage ? conversation?.lastMessage.id : undefined
      );

      this.activeContact?.chat.setLoaded(true);

      document
        .getElementById(`message-${this.activeContact?.chat.messageId}`)
        ?.scrollIntoView({
          block: "start",
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
      schoolIds: rootStore.schoolsStore.activeSchoolsIds,
      page: this.prevPage,
      conversationId: id,
      dialogStatus: this.dialogStatus,
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

  async setDialogStatus(status: TConversationDialogStatus) {
    this.dialogStatus = status;
    return await this.refetch();
  }

  async setDialogStatusById(id: number, status: TConversationDialogStatus) {
    return await Api.conversation.setDialogStatus(id, status);
  }
}

export const contactStore = new ContactStore();
