import { Conversation, Message } from "@entities";

export default interface IChatStore {
  chat: Array<Conversation>;
  activeChat: Conversation;
  modalWindow: string;
  isLoaded: boolean;
  activeChatPageNumber: number;
  addPageNumber: () => void;
  setPageNumber: (number: number) => void;
  getPageNumber: () => number;
  updateMessages: (contactId: string) => any;
  loadMessages: (contactId: string, pageNumber?: number) => void;
  setModalWindow: (status: string) => void;
  readAllMsg: (id: string) => void;
  setActiveMessage: (msg: Message) => void;
  getUnreadCount: (id: string) => number;
  addMsg: (
    content: any,
    from: any,
    socialMedia: string,
    reply: any,
    files: any
  ) => void;
  sendMessage: (
    message: string,
    conversationSourceAccountId: any,
    school: any,
    files: any,
    activeMessage: Message
  ) => void;
  getMsg: (id: string, chat_id: string) => Message;
  getLastMsg: (id: string) => Message;
  deleteMsg: (id: string, chat_id: string) => void;
}
