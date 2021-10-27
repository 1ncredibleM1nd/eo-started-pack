import { makeAutoObservable } from "mobx";
import { TComment, TCommentStatus } from "@/api/modules/comment";

export class Comment {
  id: number;
  schoolId: number;
  conversationId: number;
  content: string;
  status: TCommentStatus;
  creatorId: number;
  createdAt: number;

  constructor(comment: TComment) {
    makeAutoObservable(this);
    this.id = comment.id;
    this.schoolId = comment.schoolId;
    this.conversationId = comment.conversationId;
    this.content = comment.content;
    this.status = comment.status;
    this.creatorId = comment.creatorId;
    this.createdAt = comment.createdAt;
  }
}
