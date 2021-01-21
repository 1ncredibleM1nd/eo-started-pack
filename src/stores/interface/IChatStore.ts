import IChat from './IChat'



export default interface IChatStore {
    chat: IChat[];
    init: (data: any) => void;
    addMsg: (chat_id: string, content: string, from: any) => void;
    getLastMsg: (id: string) => string;
    getCurrentChat: (id: string) => IChat;
}