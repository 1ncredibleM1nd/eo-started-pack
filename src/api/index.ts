import Account from "./Account";
import Conversation from "./Conversation";
import { Tags } from "./Tags";
import { TemplateAnswers } from "./TemplateAnswers";
import { default as SearchAPI } from "./modules/search";
import { singleton } from "tsyringe";

const account = new Account();
const conversation = new Conversation();
const tags = Tags;
const templateAnswers = TemplateAnswers;

export { account, conversation, tags, templateAnswers };

export type { TRequest } from "./request-builder";

@singleton()
export class Api {
  search = SearchAPI;
}
