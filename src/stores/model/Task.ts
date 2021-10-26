import { makeAutoObservable } from "mobx";
import { TTask } from "@/api/types";

export class Task {
  id: number;
  name?: string;
  avatar?: string;
  content: string;
  creatorId: number;
  status: string;
  createdAt: number;
  timestampDateToComplete: number;
  conversationId: number;
  socialMedia: string;
  schoolId: number;

  constructor({
    id,
    name,
    avatar,
    content,
    creator_id,
    status,
    created_at,
    timestamp_date_to_complete,
    conversation_id,
    social_media,
    school_id,
  }: TTask) {
    makeAutoObservable(this);

    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.schoolId = school_id;
    this.conversationId = conversation_id;
    this.content = content;
    this.status = status;
    this.socialMedia = social_media;
    this.creatorId = creator_id;
    this.createdAt = created_at;
    this.timestampDateToComplete = timestamp_date_to_complete;
  }

  setStatus(status: string) {
    this.status = status;
  }
}
