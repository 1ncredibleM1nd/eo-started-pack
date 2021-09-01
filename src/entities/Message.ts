import { makeAutoObservable } from "mobx";
import Entity from "./Entity";
import Attachment from "./Attachment";
import { User } from "@/stores/model/User";

class Message {
  id: string;
  combineWithPrevious: boolean;
  social_media: string;
  content: string;
  readed: boolean = false;
  smiles: Array<string> = [];
  reply: Message = null;
  edited: boolean = false;
  income: boolean;
  attachments: Attachment[] | [];
  entity: Entity;
  user: User;
  timestamp: number;
  isLastMessage: boolean;

  constructor(
    id: string,
    combineWithPrevious: boolean,
    social_media: string,
    content: string,
    income: boolean,
    timestamp: number,
    entity: Entity,
    user: User,
    readed?: boolean,
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
    this.readed = readed ? readed : false;
    this.attachments = attachments.map((attachment) => ({
      ...attachment,
      isIframe: social_media === "vkontakte",
    }));
  }

  setCombineWithPrevious(key: boolean): void {
    this.combineWithPrevious = key;
  }

  readMessage(): void {
    this.readed = true;
  }

  addSmile(smile: string): void {
    this.smiles.push(smile);
  }

  editMessage(value: string): void {
    this.content = value;
    this.edited = true;
  }
}

export default Message;
