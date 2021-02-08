
import { action, observable, reaction } from 'mobx'
import { IChat, IChatStore, IMsg } from '@stores/interface';
import { contactStore, appStore } from '@stores/implementation';
import { getMessages } from '@actions'
import moment from 'moment'
import 'moment/locale/ru'
moment.locale('ru')
import { sendMsg } from '@actions'
import $ from 'jquery'


export class ChatStore implements IChatStore {
    chat: IChat[] = [];
    @observable loaded: boolean = false
    @observable activeChat: IChat;
    @observable activeMsg: IMsg;
    @observable modalWindow: string = 'close'
    activeChatPageNumber: number = 1
    sendingMsg: boolean = false
    activeChatMemory: any = []
    pageLoading: boolean = false



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
    addPageNumber() {
        this.activeChatPageNumber += 1
    }

    @action
    setPageNumber(number: number) {
        this.activeChatPageNumber = number
    }


    @action
    async sendMessage(message: string, conversationSourceAccountId: any, school: string) {
        this.sendingMsg = true
        await sendMsg(this.activeChat.id, message, conversationSourceAccountId, school)
        this.sendingMsg = false
    }





    @action
    async loadMessages(contact_id: string, pageNum?: number) {
        if (this.pageLoading) return null

        let messages: IMsg[][] = []
        this.pageLoading = true

        for (let i = 1; i <= pageNum; i++) {
            const pageArray: IMsg[] = []
            let pageContent = await getMessages(contact_id, i, appStore.school)

            if (pageContent.messages.length === 0) {
                break;
            }

            await pageContent.messages.forEach((msg_item: any, index: number) => {
                //let userId = currentChat.user.find((id: any) => id === msg.from)
                // let user = userStore.getUser(userId)
                //let role = chat.role.find((role: any) => role.id === msg.from)
                //let prevUser, nextUser: any
                let prevMsg: any;
                let flowMsgNext, flowMsgPrev, center = false
                let prevReaded, time_scope: any = null

                if (pageContent.messages[index - 1]) {
                    prevMsg = pageContent.messages[index - 1]
                    if (prevMsg) prevReaded = prevMsg.readed
                }
                if (pageContent.messages[index + 1]) {
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
                    //avatar: contact_item.avatar
                }
                pageArray.unshift(msg)
            });
            messages.unshift(pageArray)
        }

        if (this.activeChat && this.activeChat.msg) {
            this.activeChat.msg = messages
            console.log(messages)
            if ($(`.page-${this.activeChatPageNumber}`)) {
                $('.msg_space').animate({ scrollTop: $(`.page-1`).height() + 500 }, 0);
                setTimeout(() => {
                    this.pageLoading = false
                    this.addPageNumber()
                }, 500)
            }
        } else {
            this.pageLoading = false
            return messages
        }

        return null
    }

    @action
    async updateMessages(contact_id: string) {
        if (this.sendingMsg) return null
        const msg_res = await getMessages(contact_id, 1, appStore.school)
        let msgArray: any = []

        await msg_res.messages.forEach((msg_item: any, index: number) => {
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
                //avatar: contact_item.avatar
            }
            msgArray.unshift(msg)
        });

        if (this.activeChat && this.activeChat.msg) {
            this.activeChat.msg[0] = msgArray
        }
    }




    @action
    getMsg(id: string, chat_id: string): IMsg {
        let chat = this.chat.find((chat_item: IChat) => chat_item.id === chat_id)

        for (let i = chat.msg.length; i >= 0; i--) {
            let page = chat.msg[i]
            return page.find((msg: IMsg) => msg.id === id)
        }

        return null
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
        let chat = this.chat.find((chat_item: IChat) => chat_item.contact_id === id)

        let counting = true

        for (let i = chat.msg.length; i >= 0; i--) {
            let page = chat.msg[i]

            if (!counting) break;

            for (let index = page.length; index >= 0; index--) {
                const msg = page[index];
                if (!msg.readed) {
                    unreadedCount += 1
                } else {
                    counting = false
                }
            }
        }

        return unreadedCount
    }

    @action
    async addMsg(content: string, from: any, social_media: string, reply: any) {
        if (this.activeChat) {
            let id = 'msg_' + Math.random()
            contactStore.setLastMsg(this.activeChat.contact_id, `msg_${id}`)
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
            this.activeChat.msg[0].unshift(msg)
            $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 0);

        }
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
    async init(activeContact: any) {
        if (activeContact) {

            let messages: any
            if (this.activeChat && this.activeChat.msg) {
                //await this.updateMessages(activeContact.id)
                messages = this.activeChat.msg
            } else {
                messages = await this.loadMessages(activeContact.id, 1)
            }

            let chat: any = {
                contact_id: activeContact.id,
                id: activeContact.id,
                activeSocial: activeContact.last_message.social_media,
                role: [],
                user: activeContact.user,
                msg: messages,
                active_msg: null,
                setActiveMsg(msg: IMsg) {
                    this.active_msg = msg;
                },
                changeSocial(social: any) {
                    this.activeSocial = social;
                }
            }

            if (JSON.stringify(this.activeChat) !== JSON.stringify(chat)) {

                this.loaded = true
                this.activeChat = chat
            }
        }
    }



}

export const chatStore = new ChatStore()