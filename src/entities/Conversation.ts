import { observable } from "mobx";
import IRole from "@stores/interface/IRole";
import Message from "./Message";
import User from "./User";

class Conversation {
  id: string;
  contactId: string;
  role: Array<IRole> = [];
  @observable activeSocial: string;
  @observable messages: Array<Array<Message>> = [];
  @observable user: User;
  @observable activeMessage: Message = null;

  constructor(id: string, contactId: string, activeSocial: string, user: User) {
    this.id = id;
    this.contactId = contactId;
    this.activeSocial = activeSocial;
    this.user = user;
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
