import Account from "./Account";
import Conversation from "./Conversation";
import { Tags } from "./Tags";

const account = new Account();
const conversation = new Conversation();
const tags = Tags;

export { account, conversation, tags };

export type { TRequest } from "./request-builder";
export { default as SearchAPI } from "./modules/search";
