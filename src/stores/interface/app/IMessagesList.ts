import { Message } from "@entities";

interface IMessagesList {
  contactId: string;
  messages: Array<Array<Message>>;
}

export default IMessagesList;
