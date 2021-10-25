import { makeAutoObservable } from "mobx";
import { Entity } from "./Entity";
import { Attachment } from "./Attachment";
import { User } from "@/stores/model";

export class Message {
  id: number;
  combineWithPrevious: boolean;
  social_media: string;
  content: string;
  smiles: Array<string> = [];
  reply: Message = null;
  edited: boolean = false;
  income: boolean;
  entity: Entity;
  user: User;
  attachments: Attachment[] | [];
  timestamp: number;
  isLastMessage: boolean;

  constructor(
    id: number,
    combineWithPrevious: boolean,
    social_media: string,
    content: string,
    income: boolean,
    timestamp: number,
    entity: Entity,
    user: User,
    attachments?: Attachment[]
  ) {
    makeAutoObservable(this);

    this.id = id;
    this.combineWithPrevious = combineWithPrevious;
    this.social_media = social_media;
    this.content = content;
    this.income = income;
    this.timestamp = timestamp;
    this.entity = entity;
    this.user = user;
    this.attachments = attachments.map((attachment) => ({
      ...attachment,
      isIframe: social_media === "vkontakte",
    }));
  }

  setCombineWithPrevious(key: boolean): void {
    this.combineWithPrevious = key;
  }

  editMessage(value: string): void {
    this.content = value;
    this.edited = true;
  }
}
