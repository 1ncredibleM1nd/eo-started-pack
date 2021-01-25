import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface';
import { Badge } from 'antd';


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

        const { contactStore, chatStore, appStore, onSelect, userStore } = props;
        let ContactsData = contactStore.contact
        const search = contactStore.search
        const hero = userStore.hero



        if (search) {

            ContactsData = ContactsData.filter((contact: any) => {
                let match = false;
                let nameSplit = contact.name.toLowerCase().split('')
                let searchSplit = search.toLowerCase().split('')
                for (let i = 0; i < search.length; i++) {
                    if (nameSplit[i] === searchSplit[i]) {
                        match = true
                    } else {
                        match = false
                        break;
                    }
                }


                contact.user.find((user: any) => {
                    let splitByWord = user.username.split(' ')
                    for (let i = 0; i < splitByWord.length; i++) {
                        const word = splitByWord[i];

                        let wordSplit = word.toLowerCase().split('')
                        let searchSplit = search.toLowerCase().split('')
                        if (!match) {
                            for (let i = 0; i < search.length; i++) {
                                if (wordSplit[i] === searchSplit[i]) {
                                    match = true
                                } else {
                                    match = false
                                    break;
                                }
                            }
                        }
                    }
                })
                return match
            })
        }


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

                        const last_msg = chatStore.getMsg(contact.last_msg, contact.chat_id);
                        let user = contact.user.find((u: any) => u.id === last_msg.from)
                        if (user && hero.id === user.id) user = false

                        let unreadedCount = 0;
                        const status = contact.status;
                        if (status === 'unread') unreadedCount = chatStore.getUnreadCount(contact.id)

                        return (
                            <div onClick={() => selectContact(contact.id)} className="contact_item">


                                <div className="avatar">
                                    <Badge className='online_dot' dot={contact.online}>
                                        <img src={contact.avatar} alt="" />
                                    </Badge>
                                </div>

                                <div className="content">
                                    <div className="header">
                                        <div className="name">
                                            {contact.name}
                                        </div>
                                        <div className={`date_last_msg`}>
                                            {last_msg.time}
                                        </div>
                                    </div>
                                    <div className={`last_msg ${status}`}>
                                        <div className="from">
                                            {user ? user.username + ': ' : 'You: '}
                                        </div>
                                        {last_msg.content}
                                    </div>
                                    {
                                        status === 'unread' ? (<Fragment>
                                            <div className="unreaded_count">
                                                {unreadedCount}
                                            </div>
                                        </Fragment>) : (<Fragment></Fragment>)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }));

export default ContactList;
