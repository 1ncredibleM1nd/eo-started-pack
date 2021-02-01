import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface';
import { Icon } from '@ui'
import $ from 'jquery'
import { Menu, Dropdown, Divider } from 'antd';
// import SmileMenu from './comp/SmileMenu'
import './Chat.scss'
import Inputer from './comp/Inputer'
import PuffLoader from "react-spinners/PuffLoader";
import ChatPlaceholder from './comp/ChatPlaceholder'

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
        const [switcher, setSwitcher] = useState('')
        const [status, setStatus] = useState('default')
        const [reRender, setReRender] = useState(false)
        const [numPages, setNumPages] = useState(1)
        const [localActiveContact, setLocalActiveContact] = useState({})


        let currentChat: any;
        if (chatStore.chat && activeContact) {
            currentChat = chatStore.activeChat
        }

        const editMsg = (id: string) => {
            let msg = chatStore.getMsg(id, currentChat.id)
            chatStore.setActiveMsg(msg, currentChat.id)
            setDraft({ ...draft, [activeContact.id + 'edit']: msg.content })
            setStatus('edit')
        }

        const deleteMsg = (id: string) => {
            chatStore.deleteMsg(id, currentChat.id)
            setReRender(!reRender)
        }

        const selectMsg = (id: string) => {
            let msg = chatStore.getMsg(id, currentChat.id)
            chatStore.setActiveMsg(msg, currentChat.id)
            setDraft({ ...draft, [activeContact.id + 'reply']: draft[activeContact.id + status] })
            setStatus('reply')
        }

        const replyMsg = (id: string) => {
            setReRender(!reRender)
        }

        const DropDownMenu = (msg: any) => {
            return (
                <Menu>
                    <Menu.Item onClick={() => editMsg(msg.id)}>
                        Редактировать
                    </Menu.Item>
                    <Menu.Item onClick={() => selectMsg(msg.id)}>
                        Выбрать
                    </Menu.Item>
                    <Menu.Item onClick={() => deleteMsg(msg.id)}>
                        Удалить
                    </Menu.Item>
                    <Menu.Item onClick={() => replyMsg(msg.id)} >
                        Переслать
                    </Menu.Item>
                </Menu>
            )
        }

        const switcherOff = () => {
            setSwitcher('')
        }

        const handleScroll = async () => {
            if ($('.msg_space').scrollTop() <= 10) {
                let res = await chatStore.loadMessages(activeContact.id, numPages + 1)
                if (res.messages.length) {
                    setNumPages(numPages + 1)
                }
            }
            if (switcher !== 'social') {
                switcherOff()
            }
        }

        if (currentChat && !currentChat.msg.length && activeContact) {
            chatStore.loadMessages(activeContact.id, numPages)
            return (
                <div className="chat">
                    <div className="loading chat_loading">
                        <PuffLoader color='#3498db' size={50} />
                    </div>
                </div>
            )
        }

        if (localActiveContact !== activeContact) {
            $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 50);
            setLocalActiveContact(activeContact)
        }

        return (
            <div className="chat">
                {
                    currentChat != undefined ? (<Fragment>
                        <div onScroll={() => handleScroll()} className="msg_space">
                            {
                                currentChat.msg.map((msg: IMsg) => {

                                    if (msg.from !== hero.id) {
                                        return (
                                            <Fragment>
                                                {
                                                    msg.readed ? (<Fragment>
                                                        {
                                                            msg.time_scope ? (<Fragment>
                                                                <div className="date_container">
                                                                    <Divider orientation="center" className='date_divider'>
                                                                        <div className="date">
                                                                            {msg.time_scope}
                                                                        </div>
                                                                    </Divider>
                                                                </div>
                                                            </Fragment>) : (<Fragment>
                                                            </Fragment>)
                                                        }
                                                    </Fragment>) : (<Fragment>
                                                        {
                                                            msg.prevReaded !== msg.readed ? (<Fragment>
                                                                <div className="date_container unread">
                                                                    <Divider orientation="center" className='date_divider unread'>
                                                                        <div className="date unread">
                                                                            Непрочитанные сообщения
                                                                        </div>
                                                                    </Divider>
                                                                </div>
                                                            </Fragment>) : (<Fragment>
                                                            </Fragment>)
                                                        }
                                                    </Fragment>)
                                                }
                                                <div key={Math.random()} className="message">
                                                    {
                                                        !msg.flowMsgPrev && msg.flowMsgNext && !msg.center ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{msg.role ? msg.role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                    {
                                                        !msg.flowMsgNext && !msg.flowMsgPrev ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{msg.role ? msg.role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                    <div className="message-wrapper">
                                                        <div className={`message-content ${msg.flowMsgNext ? 'not-main' : ''} `}>
                                                            {
                                                                msg.reply ? (<Fragment>
                                                                    <div className="reply">
                                                                        <span>
                                                                            {msg.reply.content}
                                                                        </span>
                                                                    </div>
                                                                </Fragment>) : (<Fragment></Fragment>)
                                                            }
                                                            <div className="inset_border_container">
                                                                <div className="dummy"></div>
                                                                <div className="border_hero"></div>
                                                            </div>
                                                            <div className='msg_text_container'>
                                                                {msg.content}
                                                            </div>
                                                            {/* <div className={`smile ${switcher === msg.id ? 'active' : ''}`}>
                                                                <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === msg.id} content={<SmileMenu id={msg.id} chat_id={currentChat.id} switcherOff={switcherOff} /trigger="click">
                                                                    <Button onClick={() => { switcher === msg.id ? setSwitcher('') : setSwitcher(msg.id) }} className='transparent'>
                                                                        <Icon className={`icon_s active-grey`} name='regular_smile' />
                                                                    </Button>
                                                                </Popover>
                                                            </div> */}
                                                            {/* <div className="smile_realization">
                                                                {
                                                                    msg.smiles && msg.smiles.length ? (<Fragment>
                                                                        {
                                                                            msg.smiles.map((smile: string) => {
                                                                                return (
                                                                                    <div className="smile_msg">
                                                                                        {smile}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Fragment>) : (<Fragment></Fragment>)
                                                                }
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    {
                                                        !msg.flowMsgNext ? (<Fragment>
                                                            <div className="message-options">
                                                                <div className="avatar avatar-sm">
                                                                    <div className={`social_media_icon ${msg.social_media}`}>
                                                                        <Icon className='icon_s' name={`social_media_${msg.social_media}`} />
                                                                    </div>
                                                                    <img src={msg.avatar} alt="" />
                                                                    {/* <img src={user.avatar} alt="" /> */}
                                                                </div>
                                                                <span className="message-status">
                                                                    {
                                                                        msg.editted ? (<Fragment>
                                                                            <div className="editted_icon">
                                                                                <Icon className='active-grey' name={`solid_pencil-alt`} />
                                                                                {' '}
                                                                                Редак.
                                                                            </div>
                                                                        </Fragment>) : (<Fragment></Fragment>)
                                                                    }
                                                                    <div className="msg_time">{msg.time}</div>
                                                                    <Dropdown overlay={<DropDownMenu id={msg.id} />} placement="bottomLeft" trigger={['click']}>
                                                                        <span className='dropdown-trigger'>
                                                                            <Icon className='active-grey' name={`regular_three-dots`} />
                                                                        </span>
                                                                    </Dropdown>
                                                                </span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                </div>
                                            </Fragment>

                                        )
                                    } else {
                                        return (
                                            <Fragment>
                                                {
                                                    msg.readed ? (<Fragment>
                                                        {
                                                            msg.date ? (<Fragment>
                                                                <div className="date_container">
                                                                    <Divider orientation="center" className='date_divider'>
                                                                        <div className="date">
                                                                            {msg.date}
                                                                        </div>
                                                                    </Divider>
                                                                </div>
                                                            </Fragment>) : (<Fragment>
                                                            </Fragment>)
                                                        }
                                                    </Fragment>) : (<Fragment>
                                                        {
                                                            msg.prevReaded !== msg.readed ? (<Fragment>
                                                                <div className="date_container unread">
                                                                    <Divider orientation="center" className='date_divider unread'>
                                                                        <div className="date unread">
                                                                            Непрочитанные сообщения
                                                                        </div>
                                                                    </Divider>
                                                                </div>
                                                            </Fragment>) : (<Fragment>
                                                            </Fragment>)
                                                        }
                                                    </Fragment>)
                                                }

                                                <div key={Math.random()} className={`message self ${msg.flowMsgNext ? 'not-main' : ''} `} >
                                                    {
                                                        !msg.flowMsgPrev && msg.flowMsgNext && !msg.center ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{msg.role ? msg.role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                    {
                                                        !msg.flowMsgNext && !msg.flowMsgPrev ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{msg.role ? msg.role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }

                                                    <div className="message-wrapper">
                                                        <div className={`message-content ${msg.flowMsgNext ? 'not-main' : ''} `}>
                                                            {
                                                                msg.reply ? (<Fragment>
                                                                    <div className="reply">
                                                                        <span>
                                                                            {msg.reply.content}
                                                                        </span>
                                                                    </div>
                                                                </Fragment>) : (<Fragment></Fragment>)
                                                            }
                                                            <div className="inset_border_container">
                                                                <div className="dummy"></div>
                                                                <div className="border_hero"></div>
                                                            </div>
                                                            <span>
                                                                {msg.content}
                                                            </span>
                                                            {/* <div className={`smile ${switcher === msg.id ? 'active' : ''}`}>
                                                                <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === msg.id} content={<SmileMenu id={msg.id} chat_id={currentChat.id} switcherOff={switcherOff} />} trigger="click">
                                                                    <Button onClick={() => { switcher === msg.id ? setSwitcher('') : setSwitcher(msg.id) }} className='transparent'>
                                                                        <Icon className={`icon_s active-grey`} name='regular_smile' />
                                                                    </Button>
                                                                </Popover>
                                                            </div> */}
                                                            {/* <div className="smile_realization">
                                                                {
                                                                    msg.smiles && msg.smiles.length ? (<Fragment>
                                                                        {
                                                                            msg.smiles.map((smile: string) => {
                                                                                return (
                                                                                    <div className="smile_msg">
                                                                                        {smile}
                                                                                    </div>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Fragment>) : (<Fragment></Fragment>)
                                                                }
                                                            </div> */}
                                                            <div className="readed-status">
                                                                {
                                                                    msg.readed ? (<Fragment>
                                                                        <Icon className='white' name={`solid_readed`} />
                                                                    </Fragment>) : (<Fragment>
                                                                        <Icon className='white' name={`solid_check-msg`} />
                                                                    </Fragment>)
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {
                                                        !msg.flowMsgNext ? (<Fragment>
                                                            <div className="message-options">
                                                                <div className="avatar avatar-sm">
                                                                    <div className={`social_media_icon ${msg.social_media}`}>
                                                                        <Icon className='icon_s' name={`social_media_${msg.social_media}`} />
                                                                    </div>
                                                                    {/* <img src={user.avatar} alt="" /> */}
                                                                </div>
                                                                <span className="message-status">
                                                                    {
                                                                        msg.editted ? (<Fragment>
                                                                            <div className="editted_icon">
                                                                                <Icon className='active-grey' name={`solid_pencil-alt`} />
                                                                                {' '}
                                                                    Редак.
                                                                            </div>
                                                                        </Fragment>) : (<Fragment></Fragment>)
                                                                    }
                                                                    <div className="msg_time">{msg.time}</div>
                                                                    <Dropdown overlay={<DropDownMenu id={msg.id} />} placement="bottomLeft" trigger={['click']}>
                                                                        <span className='dropdown-trigger'>
                                                                            <Icon className='active-grey' name={`regular_three-dots`} />
                                                                        </span>
                                                                    </Dropdown>
                                                                </span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                </div>
                                            </Fragment>
                                        )
                                    }
                                })
                            }
                        </div>
                        <Inputer />
                    </Fragment>) : (
                            <ChatPlaceholder />
                        )
                }

            </div >
        );
    }));

export default Chat;
