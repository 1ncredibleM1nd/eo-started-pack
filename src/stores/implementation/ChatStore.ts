import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { getMessages, sendMessage } from "@/actions";
import { Entity, Message } from "../../entities";
import { rootStore } from "..";
import { uniqBy, sortBy } from "lodash-es";

const MAX_MESSAGE_COUNT_ON_PAGE = 29;

export class ChatStore {
  messages: Message[] = [];
  activeMessage: Message;
  messageId?: number;

  constructor() {
    makeAutoObservable(this);
  }

  get messagesCount() {
    return this.messages.length - 1 ?? 0;
  }

  get getPageNumber() {
    return Math.floor(this.messagesCount / MAX_MESSAGE_COUNT_ON_PAGE);
  }

  get getNextPageNumber() {
    return this.getPageNumber + 1;
  }

  get lastMessage() {
    return (
      this.messages.find(({ id }) => id === this.messageId) ||
      this.messages[this.messages.length - 1]
    );
  }

  isLoaded = false;
  setLoaded(state: boolean) {
    this.isLoaded = state;
  }

  pageLoading = false;
  hasPrevPage = true;
  prevPage: number = 1;
  hasNextPage = true;
  nextPage: number = 1;

  async sendMessage(
    contactId: number,
    message: string,
    conversationSourceAccountId: string,
    schoolIds: Array<number>,
    files: Array<File>,
    activeMessage: Message
  ) {
    this.setActiveMessage(null);
    return sendMessage(
      contactId,
      message || "Files",
      conversationSourceAccountId,
      schoolIds,
      files,
      activeMessage?.id ?? null
    );
  }

  async loadMessages(contactId: number, page: number, messageId?: number) {
    this.pageLoading = true;

    const { items: newMessages, page: responsePage } = await getMessages(
      contactId,
      page,
      rootStore.schoolsStore.activeSchoolsIds,
      messageId
    );

    this.messages = sortBy(uniqBy([...newMessages], "id"), [
      "timestamp",
      "id",
    ]).map((message: Message, index) =>
      this.collectMessage({
        previous: newMessages[index - 1],
        current: message,
      })
    );

    this.messageId = messageId;

    this.prevPage = responsePage;
    this.hasPrevPage = this.prevPage > 1;

    this.nextPage = responsePage;
    this.hasNextPage =
      this.messagesCount > MAX_MESSAGE_COUNT_ON_PAGE * page - 1;

    this.pageLoading = false;
  }

  async loadPrev(contactId: number) {
    if (this.pageLoading || !this.hasPrevPage || this.prevPage === 1) {
      return;
    }

    const scroller = document.querySelector(".msg_space");
    const saveScrollPosition = scroller?.scrollTop || 0;

    const { items: newMessages, page } = await getMessages(
      contactId,
      this.prevPage - 1,
      rootStore.schoolsStore.activeSchoolsIds
    );

    this.messages = sortBy(uniqBy([...newMessages, ...this.messages], "id"), [
      "timestamp",
      "id",
    ]).map((message: Message, index) =>
      this.collectMessage({
        previous: newMessages[index - 1],
        current: message,
      })
    );

    this.prevPage = page;
    this.hasPrevPage = this.prevPage > 1;

    if (scroller) {
      scroller.scrollTop = saveScrollPosition;
    }
  }

  async loadNext(contactId: number) {
    if (this.pageLoading || !this.hasNextPage) {
      return;
    }

    const firstItem = this.messages[0];
    const { items: newMessages, page } = await getMessages(
      contactId,
      this.nextPage + 1,
      rootStore.schoolsStore.activeSchoolsIds
    );

    this.messages = sortBy(uniqBy([...newMessages, ...this.messages], "id"), [
      "timestamp",
      "id",
    ]).map((message: Message, index) =>
      this.collectMessage({
        previous: newMessages[index - 1],
        current: message,
      })
    );

    this.nextPage = page;
    this.hasNextPage =
      this.messagesCount > MAX_MESSAGE_COUNT_ON_PAGE * page - 1;

    document.getElementById(`message-${firstItem.id}}`)?.scrollIntoView();
  }

  addMessage(message: Message) {
    this.messages.push(this.collectMessage({ current: message }, true));
  }

  removeMessage(messageId: number) {
    const index = this.messages.findIndex(({ id }) => id === messageId);
    this.messages.splice(index, 1);
  }

  setActiveMessage(message: Message): void {
    this.activeMessage = message;
  }

  collectMessage(
    { previous, current }: { previous?: Message; current: Message },
    isLastMessage?: boolean
  ): Message {
    let user = current.user;
    if (!user) {
      user =
        contactStore.activeContact && current.income
          ? contactStore.activeContact.user
          : null;
    }

    let combineWithPrevious = false;
    if (previous) {
      let defaultCheck =
        previous.timestamp === current.timestamp &&
        previous.entity.type === current.entity.type;

      if (!current.user && previous.income && defaultCheck) {
        combineWithPrevious = true;
      }

      if (current.user && previous.income && defaultCheck) {
        combineWithPrevious = false;
      }

      if (
        current.user &&
        !previous.income &&
        defaultCheck &&
        current.user.id === previous.user.id
      ) {
        combineWithPrevious = true;
      }

      if (isLastMessage) {
        previous.setCombineWithPrevious(true);
        combineWithPrevious = false;
      }
    }

    const entity: Entity = new Entity(current.entity.type, current.entity.data);
    const message: Message = new Message(
      current.id,
      combineWithPrevious,
      current.social_media,
      current.content,
      current.income,
      current.timestamp,
      entity,
      user,
      current.readed,
      current.attachments
    );

    if (current.entity.data.replyTo) {
      message.reply = this.collectMessage({
        current: current.entity.data.replyTo,
      });
    } else if (current.reply) {
      message.reply = this.collectMessage({
        current: current.reply,
      });
    }

    return message;
  }
}
