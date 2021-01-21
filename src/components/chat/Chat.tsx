import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore, IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface';
import './Chat.scss'

type IProps = {
    chatStore?: IChatStore,
    contactStore?: IContactStore,
    stores?: IAppStore,
    userStore?: IUserStore
}

const Chat = inject((stores: IStores) => ({ chatStore: stores.chatStore, contactStore: stores.contactStore, userStore: stores.userStore }))(
    observer((props: IProps) => {

        const { chatStore, contactStore, userStore } = props;
        const activeContact = contactStore.activeContact;
        const hero = userStore.hero

        console.log('hero', hero)

        let currentChat: any;
        if (chatStore.chat && activeContact) currentChat = chatStore.getCurrentChat(activeContact.id)

        console.log('currentChat', currentChat)

        return (
            <div className="chat">
                {
                    currentChat != undefined ? (<Fragment>
                        {
                            currentChat.msg.map((msg: IMsg, index: number) => {
                                let user = currentChat.person.find((person: any) => person.id === msg.from)

                                if (user.id !== hero.id) {
                                    return (
                                        <div key={Math.random()} className="msg">
                                            <div className="msg_avatar">
                                                <img src={user.avatar} alt="" />
                                            </div>
                                            <div className="msg_content">
                                                <div className="msg_name">
                                                    {user.username}
                                                </div>
                                                {msg.content}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <div key={Math.random()} className="msg hero">
                                            <div className="msg_content">
                                                {msg.content}
                                            </div>
                                        </div>
                                    )
                                }

                            })
                        }
                    </Fragment>) : (<Fragment>
                        <div className="info_center">
                            Выберите чат для общения
                        </div>

                    </Fragment>)
                }
            </div>
        );
    }));

export default Chat;
