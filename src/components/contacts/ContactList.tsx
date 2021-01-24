import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface';


type IProps = {
    contactStore?: IContactStore,
    stores?: IAppStore,
    userStore?: IUserStore
    chatStore?: IChatStore
    appStore?: IAppStore,
    onSelect?: () => void | null;
}

const ContactList = inject((stores: IStores) => ({ contactStore: stores.contactStore, userStore: stores.userStore, chatStore: stores.chatStore, appStore: stores.appStore }))(
    observer((props: IProps) => {

        const { contactStore, chatStore, appStore, onSelect } = props;
        const ContactsData = contactStore.contact


        const selectContact = (id: any) => {
            if (onSelect) onSelect()
            contactStore.setActiveContact(id)
            chatStore.setActiveChat(id)
        }


        if (!appStore.loaded) {
            return <div className="loading">Загрузка...</div>
        }
        return (
            <div className="menu_list">
                {
                    ContactsData.map((contact: any, index: number) => {

                        const last_msg = chatStore.getLastMsg(contact.id)
                        const user = contact.user.find((u: any) => u.id === last_msg.from)


                        return (
                            <div onClick={() => selectContact(contact.id)} className="contact_item">
                                <div className="avatar">
                                    <img src={contact.avatar} alt="" />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        <div className="name">
                                            {contact.name}
                                        </div>
                                        <div className="date_last_msg">
                                            {last_msg.time}
                                        </div>
                                    </div>
                                    <div className="last_msg">
                                        <div className="from">
                                            {user ? user.username + ': ' : 'You: '}
                                        </div>
                                        {last_msg.content}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }));

export default ContactList;
