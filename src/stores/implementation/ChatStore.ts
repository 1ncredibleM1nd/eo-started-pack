
import { action, observable, reaction } from 'mobx'
import { IChat, IChatStore, IMsg } from '@stores/interface';
import moment from 'moment'

export class ChatStore implements IChatStore {
    @observable chat: IChat[] = [];
    @observable activeChat: IChat;
    @observable activeMsg: IMsg;

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
        const chat = this.chat.find((chat_item: IChat) => chat_item.id === id)
        this.activeChat = chat;
        return chat
    }


    @action
    getLastMsg(id: string): any {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.contact_id === id
        })
        return chat.msg[chat.msg.length - 1]
    }

    @action
    addMsg(chat_id: string, content: string, from: any, social_media: string, reply: any) {
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
            reply: reply,
            editted: false,
            addSmile(smile) {
                this.smiles.push(smile);
            },
            editMsg(value: string) {
                this.content = value;
                this.editted = true;
            }
        }
        chat.msg.push(msg)
    }


    @action
    deleteMsg(id: string, chat_id: string) {

        for (let index = 0; index < this.chat.length; index++) {
            let chat = this.chat[index];

            if (chat.id === chat_id) {
                chat.msg = chat.msg.filter((msg: any) => msg.id !== id)
                console.log(chat)
            }
            this.chat[index] = chat
        }
    }

    @action
    setActiveMsg(msg: IMsg, chat_id: string) {
        if (msg) {
            let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
            this.activeMsg = msg
            chat.setActiveMsg(msg)
        } else {
            let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
            this.activeMsg = null
            chat.setActiveMsg(null)
        }

    }


    setActiveChat(id: string) {
        let chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === id)
        this.activeChat = chat
    }



    @action
    async init(data: IChat[]) {
        let chat = [];
        for (let index = 0; index < data.length; index++) {
            const chat_item: IChat = data[index];
            const initChat: IChat = {
                ...chat_item,
                active_msg: null,
                setActiveMsg(msg: IMsg) {
                    this.active_msg = msg;
                },
                changeSocial(social) {
                    this.activeSocial = social;
                }
            }

            chat.push(initChat)
            for (let i = 0; i < chat_item.msg.length; i++) {

                let msg: IMsg = {
                    ...chat_item.msg[i],
                    editMsg(value: string) {
                        this.content = value;
                        this.editted = true;
                    },
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