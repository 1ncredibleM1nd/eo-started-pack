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

                contact.user.find((id: any) => {
                    let user = userStore.getUser(id)
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

                        const last_message_id = chatStore.getMsg(contact.last_message_id, contact.chat_id);
                        const userId = contact.user.find((id: any) => id === last_message_id.from)
                        let user = userStore.getUser(userId)
                        const status = contact.status;

                        let unreadedCount = 0;
                        let online = Object.keys(user.online).find(key => user.online[key] === 'В сети')

                        if (user && hero.id === user.id) user = undefined
                        if (status === 'unread') unreadedCount = chatStore.getUnreadCount(contact.id)

                        return (
                            <div onClick={() => selectContact(contact.id)} className="contact_item">


                                <div className="avatar">
                                    <Badge className='online_dot' dot={Boolean(online)}>
                                        <img src={contact.avatar} alt="" />
                                    </Badge>
                                </div>

                                <div className="content">
                                    <div className="header">
                                        <div className="name">
                                            {contact.name}
                                        </div>
                                        <div className={`date_last_msg`}>
                                            {last_message_id.time}
                                        </div>
                                    </div>
                                    <div className={`last_msg ${status}`}>
                                        <div className="from">
                                            {user ? user.username + ': ' : 'You: '}
                                        </div>
                                        {last_message_id.content}
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
