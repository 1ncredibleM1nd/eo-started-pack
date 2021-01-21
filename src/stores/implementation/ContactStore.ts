import { action, computed, observable, reaction } from 'mobx'
import { IContactStore, IContact } from '@stores/interface';

export class ContactStore implements IContactStore {
    @observable contact: IContact[] = [];
    @observable activeContact: IContact;

    constructor() {
        reaction(() => {
            return this.contact;
        }, () => {
            if (true) {
            }
        })
    }

    setActiveContact(id: string) {
        this.activeContact = this.contact.find(item => item.id === id);
    }

    @action
    async init(data: any) {
        this.contact = data;
    }


    @computed
    get avaliableContacts() {
        return this.contact;
    }




}

export const contactStore = new ContactStore()