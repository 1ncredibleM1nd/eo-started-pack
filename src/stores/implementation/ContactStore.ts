import { makeAutoObservable } from "mobx";
import { Conversation } from "../../entities";
import { rootStore } from "..";
import { getConversations } from "@/actions";
import { User } from "@/stores/model/User";
import { reverse, sortBy } from "lodash-es";
import { TConversationDialogStatus } from "@/entities/Conversation";
import { conversation } from "@/api";
import { Task } from "@/stores/model/Task";
import { TConversationDialogStatus } from "@/entities/Conversation";
import { conversation } from "@/api";

export class ContactStore {
  contacts: Map<number, Conversation> = new Map();
  activeContact?: Conversation;
  dialogStatus: TConversationDialogStatus = ""; // use for all

  constructor() {
    makeAutoObservable(this);
  }

  get activeContactId() {
    return this.activeContact?.id;
  }

  changeManager(managerId: number) {
    this.activeContact?.changeManager(managerId);
  }

  async createTask(task: Task) {
    this.activeContact.tasks.unshift(task);
    let { data } = await conversation.createTask(
      this.activeContact?.id,
      task.content,
      task.timestampDateToComplete
    );

    task.id = data.data.id;
  }

  async completeTask(id: number) {
    const completed = this.activeContact?.tasks?.find((task) => task.id === id);
    completed.status = "completed";
    this.activeContact?.filterTasks(id);
    await conversation.setStatusTask(id, "completed");
  }

  async deleteTask(id: number) {
    this.activeContact?.deleteTask(id);
    await conversation.setStatusTask(id, "deleted");
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
    return await conversation.setDialogStatus(id, status);
  }
}

export const contactStore = new ContactStore();
