import { observable, makeObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import User from "./User";

class Conversation {
  id: string;
  contactId: string;
  sourceAccountId: string;
  role: Array<IRole> = [];
  activeSocial: string;
  messages: Message[] = [];
  user: User;
  activeMessage: Message = null;
  schoolId: string;
  sendFile: boolean;
  linkSocialPage: string = null;

  constructor(
    id: string,
    contactId: string,
    sourceAccountId: string,
    activeSocial: string,
    user: User,
    schoolId?: string,
    sendFile?: boolean,
    linkSocialPage?: string
  ) {
    makeObservable(this, {
      activeSocial: observable,
      messages: observable,
      user: observable,
      activeMessage: observable,
    });
    this.id = id;
    this.contactId = contactId;
    this.sourceAccountId = sourceAccountId;
    this.activeSocial = activeSocial;
    this.user = user;
    this.schoolId = schoolId;
    this.sendFile = sendFile;
    this.linkSocialPage = linkSocialPage;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getLastMessage(): Message | null {
    return this.messages[this.messages.length - 1];
  }
}

export default Conversation;
