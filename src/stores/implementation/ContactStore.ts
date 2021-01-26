
import { action, computed, observable, reaction } from 'mobx'
import { IContactStore, IContact } from '@stores/interface';

export class ContactStore implements IContactStore {
    @observable contact: IContact[] = [];
    @observable activeContact: IContact;
    @observable search: string;

    @observable filter: any = {
        channel: {
            "whatsapp": true,
            "instangram": true,
            "vk": true,
            "ok": true,
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
        this.activeContact = this.contact.find(item => item.id === id);
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

        this.contact = dataContact;
    }


    @computed
    get avaliableContacts() {
        return this.contact;
    }
}

export const contactStore = new ContactStore()