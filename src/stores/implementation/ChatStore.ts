import { makeAutoObservable } from "mobx";
import { contactStore } from "@/stores/implementation";
import { getMessages, sendMessage, setUnreadChat } from "@/actions";
import { TypesMessage } from "@/stores/classes";
import { Attachment, Conversation, Entity, Message } from "../../entities";
import dayjs from "@/services/dayjs";
import { globalStore } from "..";
import { User, UserInstance } from "../model/User";
import uniqBy from "lodash.uniqby";

const MAX_MESSAGE_COUNT_ON_PAGE = 29;

export class ChatStore {
  chat: Array<Conversation> = [];
  isLoaded: boolean = false;
  activeChat: Conversation = null;
  hasNextPage: boolean = true;
  isLoadingPage: boolean = false;
  prevDateDivider: string = "";
  newMessageIds: string[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get messagesCount() {
    return this.activeChat?.messages.length - 1 ?? 0;
  }

  get getPageNumber() {
    return this.activeChat
      ? Math.floor(this.messagesCount / MAX_MESSAGE_COUNT_ON_PAGE)
      : 0;
  }

  get getNextPageNumber() {
    return this.getPageNumber + 1;
  }

  async sendMessage(
    message: string,
    conversationSourceAccountId: string,
    schoolIds: Array<number>,
    files: Array<File>,
    activeMessage: Message
  ) {
    let replyTo: string = null;

    if (activeMessage) replyTo = activeMessage.id;
    if (!message) message = "Files";

    this.setActiveMessage(null);
    await sendMessage(
      this.activeChat.id,
      message,
      conversationSourceAccountId,
      schoolIds,
      files,
      replyTo
    );
  }

  async loadMessages(contactId: string, page?: number) {
    this.isLoadingPage = true;

    const messages = await this.collectMessagesList(contactId, page);
    const filtredMessages = this.activeChat.messages.filter(
      ({ id }) => !this.newMessageIds.includes(id)
    );
    if (page === 1) {
      this.activeChat.messages = uniqBy(
        [...filtredMessages, ...messages],
        "id"
      );
    } else {
      this.activeChat.messages = uniqBy(
        [...messages, ...filtredMessages],
        "id"
      );
    }

    this.newMessageIds.length = 0;
    this.hasNextPage =
      this.messagesCount > MAX_MESSAGE_COUNT_ON_PAGE * page - 1;

    this.isLoadingPage = false;
  }

  activateLastMessage(): void {
    const lastMessage: Message =
      this.activeChat.messages[this.activeChat.messages.length - 1];

    if (
      lastMessage.income &&
      lastMessage.entity.type !== TypesMessage.MESSAGE
    ) {
      this.setActiveMessage(lastMessage);
    }
  }

  async collectMessagesList(
    contactId: string,
    page?: number
  ): Promise<Message[]> {
    const messagesOfPage: Message[] = [];

    // for (let pageNumber: number = 1; pageNumber <= page; pageNumber++) {
    const messagesArray: Array<any> = await getMessages(
      contactId,
      page,
      globalStore.schoolsStore.activeSchoolsIds
    );

    messagesArray.forEach((message) => {
      messagesOfPage.unshift(
        this.collectMessage({
          previous: messagesOfPage[0] ? messagesOfPage[0] : null,
          current: message,
        })
      );
    });
    // }

    return messagesOfPage;
  }

  getMsg(id: string, chat_id: string): Message {
    const chat = this.chat.find(
      (chat_item: Conversation) => chat_item.id === chat_id
    );

    return chat.messages.find((message: Message) => message.id === id);
  }

  getChatByContactId(contactId: string): Conversation {
    return this.chat.find(
      (chatItem: Conversation) => chatItem.contactId === contactId
    );
  }

  getLastMsg(id: string): any {
    let chat = this.getChatByContactId(id);

    return chat.messages[chat.messages.length - 1];
  }

  getUnreadCount(id: string): number {
    let unreadedCount = 0;
    let chat = this.getChatByContactId(id);
    let counting = true;
    for (let i = chat.messages.length; i >= 0; i--) {
      let message = chat.messages[i];

      if (!counting) break;

      if (!message.readed) {
        unreadedCount += 1;
      } else {
        counting = false;
      }
    }

    return unreadedCount;
  }

  async addMsg(
    content: any,
    from: any,
    socialMedia: string,
    reply: any,
    files: any[]
  ): Promise<void> {
    if (this.activeChat) {
      const id: string = "msg_" + Math.random();
      const combineWithPrevious: boolean = false;
      const entity: Entity = new Entity(TypesMessage.MESSAGE);
      const user = globalStore.usersStore.user;

      //? Текст сообщения  = названию файлов через запятую
      // TODO Переделать когда появться изменения от Бэка

      const attachments: Attachment[] = [];

      if (!content) content = "Files";

      if (files.length) {
        attachments.push(...files);
      }

      let message: Message = new Message(
        id,
        combineWithPrevious,
        socialMedia,
        content,
        false,
        dayjs().unix(),
        entity,
        user,
        false,
        attachments
      );

      message.reply = reply ? reply : this.activeChat.activeMessage;
      message.isLastMessage = true;

      message = this.collectMessage(
        {
          previous:
            this.activeChat.messages[this.activeChat.messages.length - 1],
          current: message,
        },
        true
      );

      this.activeChat.messages.push(message);
      this.newMessageIds.push(message.id);
    }
  }

  deleteMsg(id: string, chat_id: string): void {
    for (let i = 0; i < this.chat.length; i++) {
      let chat = this.chat[i];

      if (chat.id === chat_id) {
        chat.messages = chat.messages.filter((msg: any) => msg.id !== id);
      }

      this.chat[i] = chat;
    }
  }

  setActiveMessage(message: Message): void {
    this.activeChat.activeMessage = message;
  }

  collectMessage(
    { previous, current }: { previous?: any; current: any },
    isLastMessage?: boolean
  ): Message {
    let user: UserInstance = current.user;

    if (!user) {
      user =
        contactStore.activeContact && current.income
          ? contactStore.activeContact.user
          : null;
    }

    let combineWithPrevious: boolean = false;

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

  collectChat(contact: any): Conversation {
    // TODO: КОСТЫЛЬ ПРАВИТЬ СРОЧНО
    const user = User.create({
      id: Number(contact.user[0]),
      username: contact.name,
      avatar: contact.avatar,
    });

    const conversation: Conversation = new Conversation(
      contact.id,
      contact.id,
      contact.conversation_source_account_id,
      contact.last_message.social_media,
      user,
      contact.school_id,
      contact.send_file,
      contact.link_social_page,
      contact.readed
    );

    const message: Message = this.collectMessage({
      current: contact.last_message,
    });
    conversation.addMessage(message);

    return conversation;
  }

  async setUnreadChat(contactId: string) {
    if (contactId) {
      await setUnreadChat(contactId);
    }
  }
}

export const chatStore = new ChatStore();
