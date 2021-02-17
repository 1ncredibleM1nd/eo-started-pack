import {action, computed, observable, reaction} from 'mobx'
import {IContactStore, IContact} from '@stores/interface';
import {chatStore} from '@stores/implementation';
import $ from 'jquery'

export class ContactStore implements IContactStore {
    @observable contact: IContact[] = [];
    @observable activeContact: IContact;
    @observable search: string;
    @observable name: string;
    @observable filter: any = {
        channel: {
            "whatsapp": true,
            "instagram": true,
            "vkontakte": true,
            "odnoklassniki": true,
            "viber": true,
            "facebook": true,
            "telegram": true,
            "email": true
        }
    }

    constructor() {
        reaction(() => {
            return this.contact;
        }, () => {
            if (true) {
            }
        })
    }

    @action
    deleteName = () => ''

    @action
    getContact(id: string) {
        return this.contact.find((contact_item: IContact) => contact_item.id === id)
    }

    @action
    setLastMsg(id: string, msg_id: string) {
        let contact = this.contact.find((contact_item: IContact) => contact_item.id === id)
        contact.setLastMsg(msg_id)
    }

    @action
    setStatus(id: string, status: string) {
        let contact = this.contact.find((contact_item: IContact) => contact_item.id === id)
        contact.setStatus(status)
    }

    @action
    setActiveContact(id: string) {
        if (id === null) {
            chatStore.activeChatPageNumber = 1
            this.activeContact = null
        } else if (this.activeContact && this.activeContact.id === id) {
            chatStore.activeChatPageNumber = 1
            this.activeContact = null
            this.name = ''
        } else {
            chatStore.setActiveChat(null)
            this.activeContact = this.contact.find(item => item.id === id);
            chatStore.activeChatPageNumber = 1
            this.name = undefined
            chatStore.init(this.activeContact)
        }
    }


    @action
    getAvatar(id: string) {
        let contact = this.getContact(id)
        return contact.avatar
    }

    @action
    setSearch(value: string) {
        this.search = value
    }

    @action
    async init(data: any) {


        const dataContact = []
        for (let index = 0; index < data.length; index++) {
            const contact_item = data[index]
            const initContact: IContact = {
                ...contact_item,
                setStatus(status: string) {
                    this.status = status
                },
                setLastMsg(msg_id: string) {
                    this.last_message_id = msg_id
                },
            }
            dataContact.push(initContact)
        }

        if (JSON.stringify(this.contact) !== JSON.stringify(dataContact)) {


            for (let i = 0; i < this.contact.length; i++) {
                const localContact = this.contact[i];
                let serverContact = dataContact[i]
                if (!serverContact) continue;
                if (this.activeContact && this.activeContact.id === localContact.id) {
                    if (localContact.last_message.id !== serverContact.last_message.id) {
                        await chatStore.loadMessages(this.activeContact.id, 1)
                        $(".msg_space").animate({scrollTop: $('.msg_space').prop("scrollHeight")}, 0);
                    }
                }

            }

            this.contact = dataContact;
        }
    }


    @computed
    get avaliableContacts() {
        return this.contact;
    }


}

export const contactStore = new ContactStore()