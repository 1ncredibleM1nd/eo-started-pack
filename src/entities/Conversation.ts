import { makeAutoObservable } from "mobx";
import IRole from "@/stores/interface/IRole";
import Message from "./Message";
import { User } from "@/stores/model/User";
import { conversation } from "@/ApiResolvers";

const RESET_TAGS = [0];

class Conversation {
  id: number;
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
  readed: boolean;
  tags: number[] = [];

  constructor(
    id: number,
    contactId: string,
    sourceAccountId: string,
    activeSocial: string,
    user: User,
    tags: number[],
    schoolId?: string,
    sendFile?: boolean,
    linkSocialPage?: string,
    readed?: boolean
  ) {
    makeAutoObservable(this);

    this.id = id;
    this.contactId = contactId;
    this.sourceAccountId = sourceAccountId;
    this.activeSocial = activeSocial;
    this.user = user;
    this.tags = tags;
    this.schoolId = schoolId;
    this.sendFile = sendFile;
    this.linkSocialPage = linkSocialPage;
    this.readed = readed;
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  getLastMessage(): Message | null {
    return this.messages[this.messages.length - 1];
  }

  async addTag(tagIds: number[], replace = false) {
    const tags = replace ? tagIds : [...this.tags, ...tagIds];
    const { data } = await conversation.setTags(
      this.id,
      tags.length > 0 ? tags : RESET_TAGS
    );
    if (data.data) {
      if (replace) {
        this.tags = tagIds;
      } else {
        this.tags.push(...tagIds);
      }
    }
  }

  async deleteTag(id: number) {
    const filteredTags = this.tags.filter((tagId) => tagId !== id);
    const { data } = await conversation.setTags(
      this.id,
      filteredTags.length > 0 ? filteredTags : RESET_TAGS
    );

    if (data.data) {
      this.tags = filteredTags;
    }
  }
}

export default Conversation;
