import { makeAutoObservable } from "mobx";
import { ITask } from "@/stores/interface/ITask";

export class Task implements ITask {
  id: number;
  content: string;
  creatorId: number;
  status: string;
  createdAt: number;
  timestampDateToComplete: number;

  constructor(
    id: number,
    content: string,
    creatorId: number,
    status: string,
    createdAt: number,
    timestampDateToComplete: number
  ) {
    makeAutoObservable(this);
    this.id = id;
    this.content = content;
    this.creatorId = creatorId;
    this.status = status;
    this.createdAt = createdAt;
    this.timestampDateToComplete = timestampDateToComplete;
  }
}
