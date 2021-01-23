import IChat from './IChat'
import IMsg from './IMsg'


export default interface IChatStore {
    chat: IChat[];
    init: (data: any) => void;
    addMsg: (chat_id: string, content: string, from: any, social_media: string) => void;
    getMsg: (id: string, chat_id: string) => IMsg;
    getLastMsg: (id: string) => IMsg;
    changeSocial: (social: string) => void;
    getCurrentChat: (id: string) => IChat;
    getChat: (id: string) => IChat;
}