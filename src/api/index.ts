import { Account } from "./Account";
import { Tags } from "./Tags";
import { Search } from "./modules/search";
import { CommentApi } from "@/api/modules/comment";
import { Conversation } from "./Conversation";
import { TemplateAnswers } from "./TemplateAnswers";

export const Api = {
  account: new Account(),
  tags: new Tags(),
  search: new Search(),
  comment: new CommentApi(),
  conversation: new Conversation(),
  templateAnswers: new TemplateAnswers(),
};
