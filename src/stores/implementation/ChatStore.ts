
import { action, observable, reaction } from 'mobx'
import { IChat, IChatStore, IMsg } from '@stores/interface';
import { contactStore } from '@stores/implementation';
import { getMessages } from '@actions'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')

export class ChatStore implements IChatStore {
    chat: IChat[] = [];
    @observable loaded: boolean = false
    @observable activeChat: IChat;
    @observable activeMsg: IMsg;
    @observable modalWindow: string = 'close'

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
    async loadMessages(contact_id: string, numPages: number) {

        const msg_res = await getMessages(contact_id, numPages)
        //const msg_res = await getMessages(contact_id)

        let chat = this.getChat_contactId(contact_id)
        let msgArray: any = [...chat.msg]

        console.log('msg_res', msg_res)

        msg_res.messages.forEach((msg_item: any, index: number) => {
            //let userId = currentChat.user.find((id: any) => id === msg.from)
            // let user = userStore.getUser(userId)
            //let role = chat.role.find((role: any) => role.id === msg.from)
            //let prevUser, nextUser: any

            let prevMsg: any;
            let flowMsgNext, flowMsgPrev, center = false
            let prevReaded, time_scope: any = null

            if (msg_res.messages[index - 1]) {
                prevMsg = msg_res.messages[index - 1]
                if (prevMsg) prevReaded = prevMsg.readed
            }
            if (msg_res.messages[index + 1]) {
                //nextMsg = msg_res.messages[index + 1]
                //nextUser = userStore.getUser(nextMsg.from)
            }
            if (prevMsg && prevMsg.date !== msg_item.date) {
                time_scope = msg_item.date
            } else {
                time_scope = null
            }

            // if (nextUser && nextUser.id === userId) flowMsgNext = true
            // if (prevUser && prevUser.id === userId) flowMsgPrev = true
            // if (flowMsgNext && flowMsgPrev) if (prevUser.id === user.id && nextUser.id === user.id) center = true

            const msg = {
                time_scope,
                prevReaded,
                flowMsgNext,
                flowMsgPrev,
                center,
                ...msg_item,
                read() {
                    this.readed = true
                },
                addSmile(smile: any) {
                    this.smiles.push(smile);
                },
                editMsg(value: string) {
                    this.content = value;
                    this.editted = true;
                }
                // avatar: contact_item.avatar
            }
            msgArray.push(msg)
        });
        chat.msg = msgArray

        return msg_res
    }

    @action
    getMsg(id: string, chat_id: string): IMsg {
        let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
        return chat.msg.find((msg: IMsg) => msg.id === id)
    }

    @action
    getChat_contactId(contact_id: string): IChat {
        const chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === contact_id)
        this.activeChat = chat;
        return chat
    }

    @action
    getChat(id: string): IChat {
        const chat = this.chat.find((chat_item: IChat) => chat_item.id === id)
        this.activeChat = chat;
        return chat
    }

    @action
    setModalWindow(status: string) {
        this.modalWindow = status
    }


    @action
    getLastMsg(id: string): any {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.contact_id === id
        })
        return chat.msg[chat.msg.length - 1]
    }

    @action
    getUnreadCount(id: string): number {
        let unreadedCount = 0;

        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.contact_id === id
        })
        for (let i = 0; i < chat.msg.length; i++) {
            const msg = chat.msg[i];
            if (!msg.readed) unreadedCount += 1
        }

        return unreadedCount
    }

    @action
    addMsg(chat_id: string, content: string, from: any, social_media: string, reply: any) {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.id === chat_id
        })
        // let id = chat.msg[chat.msg.length - 1].id.split('_')[1] + 1
        let id = 'msg_' + Math.random()

        contactStore.setLastMsg(chat.contact_id, `msg_${id}`)

        let msg: IMsg = {
            id: `msg_${id}`,
            from: from,
            social_media: social_media,
            content: content,
            time: moment().format('hh:mm'),
            date: moment().format('DD MMM'),
            readed: false,
            smiles: [],
            reply: reply,
            editted: false,
            read() {
                this.readed = true
            },
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

    @action
    setActiveChat(id: string) {
        let chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === id)

        this.activeChat = chat
    }


    @action
    readAllMsg(chat_id: string) {
        let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)
        for (let i = chat.msg.length; i > 0; i--) {
            const msg = chat.msg[i - 1];
            if (msg.readed) {
                break;
            } else {
                msg.read()
            }
        }
        contactStore.setStatus(chat.contact_id, 'readed')
    }



    @action
    async init(data: any) {
        let chatArray: any = [];
        for (let i = 0; i < data.length; i++) {
            const contact_item = data[i];

            console.log(contact_item.last_message.social_media)

            let chat: any = {
                contact_id: contact_item.id,
                id: contact_item.id,
                activeSocial: contact_item.last_message.social_media,
                role: [],
                user: contact_item.user,
                msg: [],
                active_msg: null,
                setActiveMsg(msg: IMsg) {
                    this.active_msg = msg;
                },
                changeSocial(social: any) {
                    this.activeSocial = social;
                }
            }
            chatArray.push(chat)
        }

        this.loaded = true
        this.chat = chatArray
    }



}

export const chatStore = new ChatStore()