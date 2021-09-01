import Account from "./Account";
import Conversation from "./Conversation";
import { Tags } from "./Tags";

const account = new Account();
const conversation = new Conversation();
const tags = Tags;

export { account, conversation, tags };

export type TApi = {
  account: Account;
  conversation: Conversation;
  tags: typeof Tags;
};
