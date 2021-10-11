import { makeAutoObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import { User } from "@/stores/model/User";
import { conversation } from "@/api";
import { ChatStore } from "@/stores/implementation/ChatStore";

const RESET_TAGS = [0];

export type TConversationDialogStatus =
  | ""
  | "unread"
  | "unanswer"
  | "read"
  | "answer";

class Conversation {
  id: number;
  sourceAccountId: string;
  role: Array<IRole> = [];
  activeSocial: string;
  user: User;
  schoolId: number;
  sendFile: boolean;
  linkSocialPage: string = "";
  // readed: boolean;
  dialogStatus: TConversationDialogStatus = "";
  chat: ChatStore;
  restrictions: { cannotSend?: string; cannotSendMessageInsta?: boolean };

  constructor({
    id,
    sourceAccountId,
    lastMessage,
    user,
    tags,
    schoolId,
    sendFile,
    linkSocialPage,
    dialogStatus = "",
    restrictions,
  }: {
    id: number;
    sourceAccountId: string;
    lastMessage: Message;
    user: User;
    tags: number[];
    schoolId?: number;
    sendFile?: boolean;
    linkSocialPage?: string;
    dialogStatus: TConversationDialogStatus;
    restrictions: { cannotSend?: string; cannotSendMessageInsta?: boolean };
  }) {
    makeAutoObservable(this);

    this.id = id;
    this.sourceAccountId = sourceAccountId;
    this.activeSocial = lastMessage.social_media;
    this.user = user;
    this.tags = tags;
    this.schoolId = schoolId;
    this.sendFile = sendFile;
    this.linkSocialPage = linkSocialPage;
    this.dialogStatus = dialogStatus;
    this.restrictions = restrictions;

    this.chat = new ChatStore();
    this.addMessage(lastMessage);
  }

  get readed() {
    return this.dialogStatus !== "unread";
  }

  get answered() {
    return this.dialogStatus !== "unanswer";
  }

  setDialogStatus(status: TConversationDialogStatus) {
    this.dialogStatus = status;
  }

  async loadMessages(page: number = 1, messageId?: number) {
    await this.chat.loadMessages(this.id, page, messageId);
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

  async removeTag(id: number) {
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

  hover(sourceId: number) {
    return this.id === sourceId || this.lastMessage.id === sourceId;
  }
}

export default Conversation;
