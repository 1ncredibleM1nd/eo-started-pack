import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface';
import { Badge } from 'antd';
// import { getMessages } from '@actions'
import './ContactList.scss'
import './Contact.scss'

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

        console.log('ContactsData', ContactsData)

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
                <div className="tab-content">
                    <div className="tab-pane active" id="chats-content">
                        <div className="d-flex flex-column h-100">
                            <div className="hide-scrollbar h-100" id="chatContactsList">
                                <ul
                                    className="contacts-list"
                                    id="chatContactTab"
                                    data-chat-list=""
                                >
                                    {
                                        ContactsData.map((contact: any, index: number) => {

                                            //const last_message_id = chatStore.getMsg(contact.last_message_id, contact.chat_id);
                                            console.log('contact', contact)
                                            // const last_message = getMessages(contact.id)

                                            const last_message = contact.last_message
                                            let online = contact.online


                                            let userId, user, status: any;


                                            if (last_message) {
                                                userId = contact.user.find((id: any) => id === last_message.from)
                                                user = userStore.getUser(userId)
                                                status = contact.status;
                                            }

                                            let unreadedCount = 0;
                                            //let online = Object.keys(user.online).find(key => user.online[key] === 'В сети')

                                            if (user && hero.id === user.id) user = undefined
                                            if (status === 'unread') unreadedCount = chatStore.getUnreadCount(contact.id)


                                            return (
                                                <li onClick={() => selectContact(contact.id)} className="contacts-item friends">
                                                    <div className="avatar">
                                                        <Badge className='online_dot' dot={Boolean(online)}>
                                                            <img src={contact.avatar} alt="" />
                                                        </Badge>
                                                    </div>
                                                    <div className="contacts-content">
                                                        <div className="contacts-info">
                                                            <h4 className="chat-name">{contact.name}</h4>
                                                            <div className="chat-time">
                                                                {
                                                                    last_message ? (<Fragment>
                                                                        <span>{last_message.time}</span>
                                                                    </Fragment>) : (<Fragment></Fragment>)
                                                                }

                                                            </div>
                                                        </div>
                                                        <div className="contacts-texts">
                                                            {
                                                                last_message ? (<Fragment>
                                                                    <div className={`last_msg ${status}`}>
                                                                        <div className="from">
                                                                            {user ? user.username + ': ' : 'You: '}
                                                                        </div>
                                                                        {last_message.content}
                                                                        {
                                                                            status === 'unread' ? (<Fragment>
                                                                                <div className="unreaded_count">

                                                                                </div>
                                                                                <div className="badge badge-rounded badge-primary ml-1">
                                                                                    {unreadedCount}
                                                                                </div>
                                                                            </Fragment>) : (<Fragment></Fragment>)
                                                                        }
                                                                    </div>
                                                                </Fragment>) : (<Fragment></Fragment>)
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                            )

                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }));

export default ContactList;
