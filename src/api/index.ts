import { Account } from "./Account";
import { Conversation } from "./Conversation";
import { Tags } from "./Tags";
import { TemplateAnswers } from "./TemplateAnswers";
import { Search } from "./modules/search";

export const Api = {
  account: new Account(),
  conversation: new Conversation(),
  tags: new Tags(),
  templateAnswers: new TemplateAnswers(),
  search: new Search(),
};
