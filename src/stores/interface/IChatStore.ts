import IChat from './IChat'
import IMsg from './IMsg'


export default interface IChatStore {
    chat: IChat[];
    activeChat: IChat;
    activeMsg: IMsg;
    setActiveMsg: (msg: IMsg, chat_id: string) => void;
    init: (data: any) => void;
    addMsg: (chat_id: string, content: string, from: any, social_media: string, status: string) => void;
    getMsg: (id: string, chat_id: string) => IMsg;
    getLastMsg: (id: string) => IMsg;
    changeSocial: (social: string) => void;
    getChat: (id: string) => IChat;
    deleteMsg: (id: string, chat_id: string) => void;
    setActiveChat: (contact_id: string) => void;
}