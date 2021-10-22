import { makeAutoObservable } from "mobx";
import { TaskStore } from "@/stores/implementation/TaskStore";
import { ITask } from "@/stores/interface/ITask";

type TProps = {
  task: ITask;
};

export type TConversationTaskStatus = "" | "today" | "expired" | "later";

class ConversationTask {
  id: number;
  content: string;
  creatorId?: number;
  timestampDateToComplete: number;
  taskStatus: TConversationTaskStatus = "";
  task: TaskStore;
  conversationId: number;
  status: string;
  name: string;
  avatar?: string;
  socialMedia: string;
  schoolId: number;

  constructor({
    id,
    content,
    creatorId,
    timestampDateToComplete,
    status,
    taskStatus = "",
    conversationId,
    name,
    avatar = "",
    socialMedia,
    schoolId,
  }: {
    id: number;
    content: string;
    creatorId?: number;
    timestampDateToComplete: number;
    status: string;
    taskStatus: TConversationTaskStatus;
    conversationId: number;
    name: string;
    avatar: string;
    socialMedia: string;
    schoolId: number;
  }) {
    makeAutoObservable(this);

    this.id = id;
    this.content = content;
    this.creatorId = creatorId;
    this.status = status;
    this.timestampDateToComplete = timestampDateToComplete;
    this.taskStatus = taskStatus;
    this.task = new TaskStore();
    this.conversationId = conversationId;
    this.name = name;
    this.avatar = avatar;
    this.socialMedia = socialMedia;
    this.schoolId = schoolId;
  }
}

export default ConversationTask;
