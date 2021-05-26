import IChat from './IChat'
import IMsg from './IMsg'

export default interface IChatStore {
	chat: IChat[];
	activeChat: IChat;
	modalWindow: string;
	loaded: boolean;
	activeChatPageNumber: number;
	pageLoading: boolean;
	addPageNumber: () => void;
	setPageNumber: (number: number) => void;
	getPageNumber: () => number;
	updateMessages: (contact_id: string) => any;
	loadMessages: (contact_id: string, pageNumber?: number) => void;
	setModalWindow: (status: string) => void;
	readAllMsg: (id: string) => void;
	setActiveMessage: (msg: IMsg) => void;
	getUnreadCount: (id: string) => number;
	addMsg: (content: any, from: any, social_media: string, status: string) => void;
	sendMessage: (message: string, conversationSourceAccountId: any, school: any, files: any, activeMessage: IMsg) => void;
	getMsg: (id: string, chat_id: string) => IMsg;
	getLastMsg: (id: string) => IMsg;
	changeSocial: (social: string) => void;
	getChat: (id: string) => IChat;
	deleteMsg: (id: string, chat_id: string) => void;
}
