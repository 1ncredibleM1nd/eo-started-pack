import { observable, makeObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import User from "./User";

class Conversation {
  id: string;
  contactId: string;
  role: Array<IRole> = [];
  activeSocial: string;
  messages: Array<Array<Message>> = [];
  user: User;
  activeMessage: Message = null;
  schoolId: string;
  send_file: boolean;

  constructor(
    id: string,
    contactId: string,
    activeSocial: string,
    user: User,
    schoolId?: string,
    send_file?: boolean
  ) {
    makeObservable(this, {
      activeSocial: observable,
      messages: observable,
      user: observable,
      activeMessage: observable,
    });
    this.id = id;
    this.contactId = contactId;
    this.activeSocial = activeSocial;
    this.user = user;
    this.schoolId = schoolId;
    this.send_file = send_file;
  }

  addMessage(message: Message): void {
    if (!this.messages.length) {
      this.messages.push([message]);
    }

    this.messages[0].push(message);
  }

  getLastMessage(): Message | null {
    if (!this.messages.length || !this.messages[0].length) {
      return null;
    }

    return this.messages[0][this.messages[0].length - 1];
  }
}

export default Conversation;
