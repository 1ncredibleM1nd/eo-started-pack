import { action, computed, observable } from "mobx";
import { appStore, userStore } from "@stores/implementation";
import { getMessages, sendMessage } from "@actions";
import moment from "moment";
import "moment/locale/ru";
import $ from "jquery";
import { TypesMessage } from "@stores/classes";
import { Conversation, Entity, Message, User } from "../../entities";
import { contactStore } from "./ContactStore";

moment.locale("ru");

export class ChatStore {
  chat: Array<Conversation> = [];
  @observable isLoaded: boolean = false;
  @observable activeChat: Conversation = null;
  @observable isPageLoading: boolean = false;

  constructor() {}

  @computed
  get getPageNumber() {
    return this.activeChat ? this.activeChat.messages.length : 0;
  }

  @computed
  get getNextPageNumber() {
    return (this.activeChat ? this.activeChat.messages.length : 0) + 1;
  }

  @action
  async sendMessage(
    message: string,
    conversationSourceAccountId: string,
    schoolIds: Array<number>,
    files: Array<File>,
    activeMessage: Message
  ) {
    let replyTo: string = null;

    if (activeMessage) {
      replyTo = activeMessage.id;
    }

    console.log("files", files);

    await sendMessage(
      this.activeChat.id,
      message,
      conversationSourceAccountId,
      schoolIds,
      files,
      replyTo
    );

    this.setActiveMessage(null);
  }

  @action
  async loadMessages(contactId: string, pageNum?: number) {
    this.isPageLoading = pageNum > 1;
    // загружаем пачки сообщений постранично

    this.activeChat.messages = await this.collectMessagesList(
      contactId,
      pageNum
    );

    if (this.activeChat.messages[0].length > 29) {
      $(".msg_space").animate({ scrollTop: $(`.page-1`).height() }, 0);
    }

    this.isPageLoading = false;
  }

  @action
  activateLastMessage(): void {
    const messagesList: Array<Array<Message>> = this.activeChat.messages;
    if (messagesList.length) {
      const lastPageMessage: Array<Message> = messagesList[0];

      if (lastPageMessage.length) {
        const lastMessage: Message =
          lastPageMessage[lastPageMessage.length - 1];

        if (
          lastMessage.income &&
          lastMessage.entity.type !== TypesMessage.MESSAGE
        ) {
          this.setActiveMessage(lastMessage);
        }
      }
    }
  }

  @action
  async collectMessagesList(
    contactId: string,
    page?: number
  ): Promise<Array<Array<Message>>> {
    const messagesOfPages: Array<Array<Message>> = [];

    for (let pageNumber: number = 1; pageNumber <= page; pageNumber++) {
      const messagesArray: Array<any> = await getMessages(
        contactId,
        pageNumber,
        appStore.getActiveSchools()
      );
      const messagesOfPage: Array<Message> = [];

      messagesArray.forEach((message) => {
        messagesOfPage.unshift(
          this.collectMessage({
            previous: messagesOfPage[0] ? messagesOfPage[0] : null,
            current: message,
          })
        );
      });

      messagesOfPages.unshift(messagesOfPage);
    }

    return messagesOfPages;
  }

  @action
  getMsg(id: string, chat_id: string): Message {
    let chat = this.chat.find(
      (chat_item: Conversation) => chat_item.id === chat_id
    );
    for (let i = chat.messages.length; i >= 0; i--) {
      let page = chat.messages[i];

      return page.find((message: Message) => message.id === id);
    }

    return null;
  }

  @action
  getChatByContactId(contactId: string): Conversation {
    return this.chat.find(
      (chatItem: Conversation) => chatItem.contactId === contactId
    );
  }

  @action
  getLastMsg(id: string): any {
    let chat = this.getChatByContactId(id);

    return chat.messages[chat.messages.length - 1];
  }

  @action
  getUnreadCount(id: string): number {
    let unreadedCount = 0;
    let chat = this.getChatByContactId(id);
    let counting = true;
    for (let i = chat.messages.length; i >= 0; i--) {
      let page = chat.messages[i];

      if (!counting) break;

      for (let index = page.length; index >= 0; index--) {
        const msg = page[index];
        if (!msg.readed) {
          unreadedCount += 1;
        } else {
          counting = false;
        }
      }
    }

    return unreadedCount;
  }

  @action
  async addMsg(
    content: any,
    from: any,
    socialMedia: string,
    reply: any
  ): Promise<void> {
    if (this.activeChat) {
      const id: string = "msg_" + Math.random();
      const time: string = moment().format("HH:mm");
      const date: string = moment().format("DD.MM");
      const combineWithPrevious: boolean = false;
      const entity: Entity = new Entity(TypesMessage.MESSAGE);
      const user: User = userStore.hero;

      let message: Message = new Message(
        id,
        time,
        date,
        combineWithPrevious,
        socialMedia,
        content,
        false,
        moment().unix(),
        entity,
        user
      );

      message.reply = reply;
      message.isLastMessage = true;

      message = this.collectMessage(
        {
          previous:
            this.activeChat.messages[0][this.activeChat.messages[0].length - 1],
          current: message,
        },
        true
      );

      this.activeChat.messages[0].push(message);

      setTimeout(() => {
        $(".msg_space").animate(
          { scrollTop: $(".msg_space").prop("scrollHeight") },
          0
        );
      });
    }
  }

  @action
  deleteMsg(id: string, chat_id: string): void {
    for (let i = 0; i < this.chat.length; i++) {
      let chat = this.chat[i];

      if (chat.id === chat_id) {
        chat.messages = chat.messages.filter((msg: any) => msg.id !== id);
      }

      this.chat[i] = chat;
    }
  }

  @action
  setActiveMessage(message: Message): void {
    this.activeChat.activeMessage = message;
  }

  collectMessage(
    { previous, current }: { previous?: any; current: any },
    isLastMessage?: boolean
  ): Message {
    let user: User = current.user ? current.user : null;

    if (!user) {
      user = contactStore.activeContact
        ? contactStore.activeContact.user
        : null;
    }

    let combineWithPrevious: boolean = false;

    current.time = moment(current.timestamp, "X").format("HH:mm");
    current.date = moment(current.timestamp, "X").format("DD.MM");

    if (previous) {
      let defaultCheck =
        previous.date === current.date &&
        previous.entity.type === current.entity.type;

      if (!current.user && previous.income && defaultCheck) {
        combineWithPrevious = true;
      }

      if (current.user && previous.income && defaultCheck) {
        combineWithPrevious = false;
      }

      if (current.user && !previous.income && defaultCheck) {
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
      current.time,
      current.date,
      combineWithPrevious,
      current.social_media,
      current.content,
      current.income,
      current.timestamp,
      entity,
      user,
      current.readed
    );

    if (current.entity.data.replyTo) {
      message.reply = this.collectMessage({
        current: current.entity.data.replyTo,
      });
    }

    return message;
  }

  collectChat(contact: any): Conversation {
    // TODO: КОСТЫЛЬ ПРАВИТЬ СРОЧНО
    const user: User = new User(contact.user[0], contact.name, contact.avatar);

    const conversation: Conversation = new Conversation(
      contact.id,
      contact.id,
      contact.last_message.social_media,
      user
    );

    const message: Message = this.collectMessage({
      current: contact.last_message,
    });
    conversation.addMessage(message);

    return conversation;
  }
}

export const chatStore = new ChatStore();
