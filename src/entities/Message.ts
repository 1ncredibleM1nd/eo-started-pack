import { observable, action } from "mobx";
import Entity from "./Entity";
import User from "./User";

class Message {
  id: string;
  time: string;
  date: string;
  @observable combineWithPrevious: boolean;
  social_media: string;
  content: string;
  readed: boolean = false;
  smiles: Array<string> = [];
  reply: Message = null;
  edited: boolean = false;
  income: boolean;
  attachments: Array<any> = [];
  entity: Entity;
  user: User;
  timestamp: number;
  isLastMessage: boolean;

  constructor(
    id: string,
    time: string,
    date: string,
    combineWithPrevious: boolean,
    social_media: string,
    content: string,
    income: boolean,
    timestamp: number,
    entity: Entity,
    user: User,
    readed?: boolean
  ) {
    this.id = id;
    this.time = time;
    this.date = date;
    this.combineWithPrevious = combineWithPrevious;
    this.social_media = social_media;
    this.content = content;
    this.income = income;
    this.timestamp = timestamp;
    this.entity = entity;
    this.user = user;
    this.readed = readed ? readed : false;
  }

  @action
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
