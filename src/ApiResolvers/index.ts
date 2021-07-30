import Account from "./Account";
import Conversation from "./Conversation";

const account = new Account();
const conversation = new Conversation();

export { account, conversation };

export type TApi = {
  account: Account;
  conversation: Conversation;
};
