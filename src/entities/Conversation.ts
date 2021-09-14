import { makeAutoObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import { User } from "@/stores/model/User";
import { conversation } from "@/ApiResolvers";
import { ChatStore } from "@/stores/implementation/ChatStore";

const RESET_TAGS = [0];

class Conversation {
  id: number;
  sourceAccountId: string;
  role: Array<IRole> = [];
  activeSocial: string;
  user: User;
  schoolId: number;
  sendFile: boolean;
  linkSocialPage: string = "";
  readed: boolean;
  chat: ChatStore;

  constructor(
    id: number,
    sourceAccountId: string,
    lastMessage: Message,
    user: User,
    tags: number[],
    schoolId?: number,
    sendFile?: boolean,
    linkSocialPage?: string,
    readed?: boolean
  ) {
    makeAutoObservable(this);

    this.id = id;
    this.sourceAccountId = sourceAccountId;
    this.activeSocial = lastMessage.social_media;
    this.user = user;
    this.tags = tags;
    this.schoolId = schoolId;
    this.sendFile = sendFile;
    this.linkSocialPage = linkSocialPage;
    this.readed = readed;

    this.chat = new ChatStore();
    this.addMessage(lastMessage);
  }

  read(state: boolean) {
    this.readed = state;
  }

  async loadMessages(page: number = 1) {
    await this.chat.loadMessages(this.id, page);
  }

  addMessage(message: Message) {
    this.chat.addMessage(message);
  }
  removeMessage(messageId: number) {
    this.chat.removeMessage(messageId);
  }

  async sendMessage(
    contactId: number,
    content: string,
    conversationSourceAccountId: string,
    schoolIds: Array<number>,
    files: Array<File>,
    activeMessage: Message
  ) {
    await this.chat.sendMessage(
      contactId,
      content || "Files",
      conversationSourceAccountId,
      schoolIds,
      files,
      activeMessage
    );
  }

  get lastMessage(): Message {
    return this.chat.lastMessage;
  }

  async addTag(tagIds: number[]) {
    const { data } = await conversation.setTags(this.id, tagIds);
  }

  async deleteTag(id: number) {
    const filteredTags = this.tags.filter((tagId) => tagId !== id);
    const { data } = await conversation.setTags(
      this.id,
      filteredTags.length > 0 ? filteredTags : RESET_TAGS
    );
  }

  tags: number[] = [];
  setTags(tags: number[]) {
    this.tags = tags;
  }
}

export default Conversation;
