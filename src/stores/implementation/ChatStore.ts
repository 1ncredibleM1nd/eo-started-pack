import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { getMessages, sendMessage } from "@/actions";
import { Entity, Message } from "../../entities";
import { globalStore } from "..";
import { uniqBy, sortBy } from "lodash";

const MAX_MESSAGE_COUNT_ON_PAGE = 29;

export class ChatStore {
  messages: Message[] = [];
  activeMessage: Message;

  hasNextPage = true;
  isLoadingPage = false;

  isLoaded = false;
  setLoaded(state: boolean) {
    this.isLoaded = state;
  }

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
    return this.messages[this.messages.length - 1];
  }

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

  async loadMessages(contactId: number, page: number) {
    this.isLoadingPage = true;

    const newMessages = await getMessages(
      contactId,
      page,
      globalStore.schoolsStore.activeSchoolsIds
    );

    this.messages = sortBy(
      uniqBy([...newMessages, ...this.messages], "id"),
      "timestamp"
    ).map((message: Message, index) =>
      this.collectMessage({
        previous: newMessages[index - 1],
        current: message,
      })
    );

    this.hasNextPage =
      this.messagesCount > MAX_MESSAGE_COUNT_ON_PAGE * page - 1;

    this.isLoadingPage = false;
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
