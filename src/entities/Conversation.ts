import { makeAutoObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import { User } from "@/stores/model/User";
import { conversation } from "@/api";
import { ChatStore } from "@/stores/implementation/ChatStore";
import { TemplateAnswersStore } from "@/stores/TemplateAnswersStore";
import { container } from "tsyringe";

import { ITask } from "@/stores/interface/ITask";
const RESET_TAGS = [0];

export type TConversationRestrictions = {
  cannotSend?: string;
  cannotSendMessageInsta?: boolean;
  maxMessageSymbols: number;
  maxCommentSymbols: number;
};

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
  restrictions: TConversationRestrictions;
  templateAnswers: TemplateAnswersStore;
  manager_id: number | null;
  tasks: ITask[] | null = [];

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
    manager_id,
    tasks,
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
    restrictions: TConversationRestrictions;
    manager_id: number;
    tasks: ITask[] | null;
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
    this.manager_id = manager_id;
    this.chat = new ChatStore();
    this.templateAnswers = container.resolve(TemplateAnswersStore);
    this.addMessage(lastMessage);
    this.tasks = tasks;
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
    await this.templateAnswers.load(this.schoolId);
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
  async changeManager(managerId: number | null) {
    this.manager_id = managerId;
    const { data: r } = await conversation.setManager(this.id, managerId);
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

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  filterTasks(id: number) {
    const completedTask = this.tasks?.find((task) => task.id === id);
    this.tasks = this.tasks.filter((task) => completedTask.id !== task.id);
    this.tasks?.push(completedTask);
  }
}

export default Conversation;
