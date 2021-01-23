
import { action, observable, reaction } from 'mobx'
import { IChat, IChatStore, IMsg } from '@stores/interface';
import moment from 'moment'

export class ChatStore implements IChatStore {
    @observable chat: IChat[] = [];

    constructor() {
        reaction(() => {
            return this.chat;
        }, () => {
            if (true) {
            }
        })
    }
    changeSocial: (social: string) => void;

    @action
    getMsg(id: string, chat_id: string): IMsg {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.id === chat_id
        })
        return chat.msg.find((msg: IMsg) => msg.id === id)
    }

    @action
    getChat(id: string): IChat {
        return this.chat.find((chat_item: IChat) => chat_item.id === id)
    }

    @action
    getCurrentChat(id: string): IChat {
        return this.chat.find((chat_item: IChat) => chat_item.contact_id === id)
    }

    @action
    getLastMsg(id: string): any {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.contact_id === id
        })
        return chat.msg[chat.msg.length - 1]
    }

    @action
    addMsg(chat_id: string, content: string, from: any, social_media: string) {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.id === chat_id
        })
        let id = chat.msg[chat.msg.length - 1].id.split('_')[1] + 1

        let msg: IMsg = {
            id: `msg_${id}`,
            from: from,
            social_media: social_media,
            content: content,
            time: moment().format('hh:mm'),
            smiles: [],
            addSmile(smile) {
                this.smiles.push(smile);
            }
        }
        chat.msg.push(msg)
    }



    @action
    async init(data: IChat[]) {
        console.log('init', data)
        let chat = [];
        for (let index = 0; index < data.length; index++) {
            const chat_item: IChat = data[index];
            const initChat: IChat = {
                ...chat_item,
                changeSocial(social) {
                    this.activeSocial = social;
                }
            }

            chat.push(initChat)
            for (let i = 0; i < chat_item.msg.length; i++) {

                let msg: IMsg = {
                    ...chat_item.msg[i],
                    addSmile(smile) {
                        this.smiles.push(smile);
                    }
                }

                chat[index].msg[i] = msg
            }

        }

        this.chat = chat
    }



}

export const chatStore = new ChatStore()