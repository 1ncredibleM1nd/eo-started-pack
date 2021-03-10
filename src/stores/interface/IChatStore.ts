import IChat from './IChat'
import IMsg from './IMsg'


export default interface IChatStore {
	chat: IChat[];
	activeChat: IChat;
	activeMsg: IMsg;
	modalWindow: string;
	loaded: boolean;
	activeChatPageNumber: number
	addPageNumber: () => void;
	updateMessages: (contact_id: string) => any;
	loadMessages: (contact_id: string, pageNumber?: number) => void;
	setModalWindow: (status: string) => void;
	readAllMsg: (id: string) => void;
	setActiveMsg: (msg: IMsg, chat_id: string) => void;
	getUnreadCount: (id: string) => number;
	init: (data: any) => void;
	addMsg: (content: any, from: any, social_media: string, status: string) => void;
	sendMessageFile: (files: any, conversationSourceAccountId: any, school: any) => void;
	sendMessage: (message: string, conversationSourceAccountId: any, school: any) => void;
	getMsg: (id: string, chat_id: string) => IMsg;
	getLastMsg: (id: string) => IMsg;
	changeSocial: (social: string) => void;
	getChat: (id: string) => IChat;
	deleteMsg: (id: string, chat_id: string) => void;
	setActiveChat: (contact_id: string) => void;
}
