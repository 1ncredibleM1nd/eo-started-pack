import { Service } from "typedi";
import Account from "./Account";
import Conversation from "./Conversation";
import { Tags } from "./Tags";
import { default as SearchAPI } from "./modules/search";
import { singleton } from "tsyringe";

const account = new Account();
const conversation = new Conversation();
const tags = Tags;

export { account, conversation, tags };

export type { TRequest } from "./request-builder";

@singleton()
export class Api {
  search = SearchAPI;
}
