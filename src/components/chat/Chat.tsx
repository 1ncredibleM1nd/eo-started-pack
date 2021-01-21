import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface';
import $ from 'jquery'
import './Chat.scss'

type IProps = {
    chatStore?: IChatStore,
    contactStore?: IContactStore,
    userStore?: IUserStore
}

const Chat = inject((stores: IStores) => ({ chatStore: stores.chatStore, contactStore: stores.contactStore, userStore: stores.userStore }))(
    observer((props: IProps) => {

        const { chatStore, contactStore, userStore } = props;
        const activeContact = contactStore.activeContact;
        const hero = userStore.hero
        const [draft, setDraft] = useState({})
        const [render, startRender] = useState(false)

        let currentChat: any;
        if (chatStore.chat && activeContact) {
            currentChat = chatStore.getCurrentChat(activeContact.id)
        }

        useEffect(() => {
            if (activeContact && !draft[activeContact.id]) $('.main_input input').val('');
        })

        const onChange = (name: string, value: string) => {
            console.log(draft)
            setDraft({ ...draft, [name]: value })
            startRender(!render)
        }

        const onSend = () => {
            $('.main_input input').val('');
            setDraft({ ...draft, [activeContact.id]: '' })
            chatStore.addMsg(currentChat.id, draft[activeContact.id], hero.id)
            console.log($(".msg").last().offset().top)
            $('.msg_space').animate({
                scrollTop: $(".msg").last().offset().top
            }, 300);

        }

        return (
            <div className="chat">

                {
                    currentChat != undefined ? (<Fragment>
                        <div className="msg_space">
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
                        </div>

                        <div className="inputer">
                            <div className="input-container">
                                <div className="inputer_btn"></div>
                                <div className="main_input">
                                    <input placeholder='Ваше сообщение' type="text" onChange={(e) => onChange(activeContact.id, e.target.value)} value={draft[activeContact.id]} />
                                </div>
                                <div className="inputer_btn"></div>

                            </div>
                            <div onClick={() => onSend()} className="send_btn">
                                {'->'}
                            </div>
                        </div>
                    </Fragment>) : (<Fragment>Загрузка...</Fragment>)
                }
            </div >
        );
    }));

export default Chat;
