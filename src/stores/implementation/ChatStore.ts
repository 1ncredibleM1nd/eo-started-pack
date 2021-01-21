
import { action, computed, observable, reaction } from 'mobx'
import { IChat, IChatStore } from '@stores/interface';

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


    @action
    getCurrentChat(id: string): IChat {
        return this.chat.find((chat_item: IChat) => chat_item.contact_id === id)
    }

    @action
    getLastMsg(id: string): any {
        let chat = this.chat.find((chat_item: IChat) => {
            return chat_item.contact_id === id
        })
        return chat.msg[chat.msg.length - 1].content
    }


    @action
    async init(data: IChat[]) {
        console.log('init', data)
        this.chat = data
    }

}

export const chatStore = new ChatStore()