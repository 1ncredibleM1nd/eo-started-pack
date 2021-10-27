import { makeAutoObservable } from "mobx";
import { Message } from "./Message";
import { Task, User } from "@/stores/model";
import { Api } from "@/api";
import { ChatStore } from "@/stores/ChatStore";
import { TemplateAnswersStore } from "@/stores/TemplateAnswersStore";

import { sortBy, filter } from "lodash-es";
import { TTask } from "@/api/types";
const RESET_TAGS = [0];

export type TConversationRestrictions = {
  canSendFile: boolean;
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

export class Conversation {
  id: number;
  sourceAccountId: string;
  activeSocial: string;
  user: User;
  schoolId: number;
  linkSocialPage: string = "";
  dialogStatus: TConversationDialogStatus = "";
  chat: ChatStore;
  restrictions: TConversationRestrictions;
  templateAnswers: TemplateAnswersStore;
  manager_id: number | null;
  tasks = new Map<number, Task>();

  constructor({
    id,
    sourceAccountId,
    lastMessage,
    user,
    tags,
    schoolId,
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
    linkSocialPage?: string;
    dialogStatus: TConversationDialogStatus;
    restrictions: TConversationRestrictions;
    manager_id: number;
    tasks: TTask[];
  }) {
    makeAutoObservable(this);

    this.id = id;
    this.sourceAccountId = sourceAccountId;
    this.activeSocial = lastMessage.social_media;
    this.user = user;
    this.tags = tags;
    this.schoolId = schoolId;
    this.linkSocialPage = linkSocialPage;
    this.dialogStatus = dialogStatus;
    this.restrictions = restrictions;
    this.manager_id = manager_id;
    this.chat = new ChatStore();
    this.templateAnswers = new TemplateAnswersStore();
    this.addMessage(lastMessage);

    tasks.forEach((data) => {
      this.tasks.set(data.id, new Task(data));
    });
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
      content || "",
      conversationSourceAccountId,
      schoolIds,
      files,
      activeMessage
    );
  }
  async changeManager(managerId: number | null) {
    this.manager_id = managerId;
    const { data: r } = await Api.conversation.setManager(this.id, managerId);
  }

  get lastMessage(): Message {
    return this.chat.lastMessage;
  }

  async addTag(tagIds: number[]) {
    const { data } = await Api.conversation.setTags(this.id, tagIds);
  }

  async removeTag(id: number) {
    const filteredTags = this.tags.filter((tagId) => tagId !== id);
    const { data } = await Api.conversation.setTags(
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

  get filteredTasks() {
    const tasks = Array.from(this.tasks.values());

    if (tasks?.length === 0) {
      return [];
    } else if (tasks?.length === 1) {
      return tasks;
    }

    return [
      ...sortBy(filter(tasks, ["status", "active"]), "timestampDateToComplete"),
      ...sortBy(
        filter(tasks, ["status", "completed"]),
        "timestampDateToComplete"
      ),
    ];
  }
}
