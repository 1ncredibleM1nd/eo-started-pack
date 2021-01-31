import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface';
import { Icon } from '@ui'
import $ from 'jquery'
import { Input, Menu, Dropdown, Button, Popover, Divider } from 'antd';
// import SmileMenu from './comp/SmileMenu'
import './Chat.scss'
import SocialMenu from './comp/SocialMenu'
import { sendMsg } from '@actions'



type IProps = {
    chatStore?: IChatStore,
    contactStore?: IContactStore,
    userStore?: IUserStore
}

const Chat = inject((stores: IStores) => ({ chatStore: stores.chatStore, contactStore: stores.contactStore, userStore: stores.userStore }))(
    observer((props: IProps) => {

        const { chatStore, contactStore, userStore } = props;
        const activeContact = contactStore.activeContact;
        const activeMsg = chatStore.activeMsg
        const hero = userStore.hero
        const [draft, setDraft] = useState({})
        const [switcher, setSwitcher] = useState('')
        const [status, setStatus] = useState('default')
        const [reRender, setReRender] = useState(false)
        const [selectedMsg, setSelectedMsg] = useState(null)


        const [keys, setKeys] = useState({
            shift: false,
            alt: false,
            ctrl: false
        })


        const handleKeyDown = (e: any) => {


            switch (e.key) {
                case 'Control':
                    setKeys({ ...keys, ctrl: true })
                    break;
                case 'Shift':
                    setKeys({ ...keys, shift: true })
                    break;
                case 'Alt':
                    setKeys({ ...keys, alt: true })
                    break;
                default:
                    break;
            }
        }

        const handleKeyUp = (e: any) => {


            switch (e.key) {
                case 'Control':
                    setKeys({ ...keys, ctrl: false })
                    break;
                case 'Shift':
                    setKeys({ ...keys, shift: false })
                    break;
                case 'Alt':
                    setKeys({ ...keys, alt: false })
                    break;
                default:
                    break;
            }


        }


        const handleEnter = () => {

            if (keys.alt || keys.shift || keys.ctrl) {
                let text = draft[activeContact.id + status] + '\n'
                setDraft({ ...draft, [activeContact.id + status]: text })

            } else {

                console.log('keys', keys)

                if (draft[activeContact.id + status] && draft[activeContact.id + status].length) {
                    chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
                    sendMsg(currentChat.id, draft[activeContact.id + status])
                }
                setDraft({ ...draft, [activeContact.id + status]: '' })
            }




        }


        let currentChat: any;
        if (chatStore.chat && activeContact) {
            currentChat = chatStore.activeChat
        }

        useEffect(() => {
            if (activeMsg) {
                setSelectedMsg(activeMsg)
            } else {
                setSelectedMsg(null)
            }
            $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 0);
            if (activeContact && !draft[activeContact.id + status]) $('.main_input input').val('');
        })


        const onChange = (name: string, value: string, event: any) => {
            setDraft({ ...draft, [name + status]: value })
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

        const onSend = () => {
            console.log('onSend')
            switch (status) {
                case 'default':
                    if (draft[activeContact.id + status].length) {
                        chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
                        console.log('Отправка сообщения chat.tsx', currentChat.id, draft[activeContact.id + status])
                        sendMsg(currentChat.id, draft[activeContact.id + status])
                    }
                    setDraft({ ...draft, [activeContact.id + status]: '' })
                    break;
                case 'edit':
                    activeMsg.editMsg(draft[activeContact.id + status])
                    setDraft({ ...draft, [activeContact.id + status]: '' })
                    chatStore.setActiveMsg(null, currentChat.id)
                    setStatus('default')
                    break;
                case 'reply':
                    chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, selectedMsg)
                    setDraft({ ...draft, [activeContact.id + 'default']: '', [activeContact.id + status]: '' })
                    chatStore.setActiveMsg(null, currentChat.id)
                    setStatus('default')
                    break;
                default:
                    break;
            }


            $('.main_input input').val('');

            $(".msg_space").animate({ scrollTop: $('.msg_space').prop("scrollHeight") }, 300);

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


        const DropDownAttacments = () => {
            return (
                <Menu>
                    <Menu.Item >
                        Фотография
                    </Menu.Item>
                    <Menu.Item>
                        Видео
                    </Menu.Item>
                    <Menu.Item >
                        Документ
                    </Menu.Item>
                    <Menu.Item >
                        Аудио
                    </Menu.Item>
                </Menu>
            )
        }


        const selectSocial = (social: string) => {
            currentChat.changeSocial(social)
            switcherOff()
        }

        const switcherOff = () => {
            setSwitcher('')
        }



        const onFocusInput = () => {
            chatStore.readAllMsg(currentChat.id)
        }

        const handleScroll = () => {
            if (switcher !== 'social') {
                switcherOff()
            }
        }

        const { TextArea } = Input;

        return (
            <div className="chat">

                {
                    currentChat != undefined ? (<Fragment>
                        <div onScroll={() => handleScroll()} className="msg_space">
                            {
                                currentChat.msg.map((msg: IMsg, index: number) => {
                                    //let userId = currentChat.user.find((id: any) => id === msg.from)
                                    // let user = userStore.getUser(userId)
                                    let role = currentChat.role.find((role: any) => role.id === msg.from)
                                    let flowMsgNext, flowMsgPrev, center = false
                                    //let prevUser, nextMsg,, nextUser: any

                                    let prevMsg, prevReaded, date: any;



                                    if (currentChat.msg[index - 1]) {
                                        prevReaded = msg.readed
                                        prevMsg = currentChat.msg[index - 1]
                                        // if (prevMsg) prevUser = userStore.getUser(prevMsg.from)
                                    } else {
                                        date = msg.date
                                        prevMsg = currentChat.msg[index - 1]
                                        if (prevMsg) prevReaded = prevMsg.readed
                                    }
                                    if (currentChat.msg[index + 1]) {
                                        //nextMsg = currentChat.msg[index + 1]
                                        // nextUser = userStore.getUser(nextMsg.from)
                                    }

                                    // if (currentChat.msg[index - 1] && currentChat.msg[index - 1].date !== msg.date) date = msg.date
                                    // if (nextUser && nextUser.id === userId) flowMsgNext = true
                                    // if (prevUser && prevUser.id === userId) flowMsgPrev = true
                                    // if (flowMsgNext && flowMsgPrev) if (prevUser.id === user.id && nextUser.id === user.id) center = true

                                    if (msg.from !== hero.id) {
                                        return (
                                            <Fragment>

                                                {
                                                    msg.readed ? (<Fragment>
                                                        {
                                                            date ? (<Fragment>
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
                                                            prevReaded !== msg.readed ? (<Fragment>
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
                                                        !flowMsgPrev && flowMsgNext && !center ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{role ? role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }

                                                    {
                                                        !flowMsgNext && !flowMsgPrev ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{role ? role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }

                                                    <div className="message-wrapper">
                                                        <div className={`message-content ${flowMsgNext ? 'not-main' : ''} `}>
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
                                                        </div>
                                                    </div>
                                                    {
                                                        !flowMsgNext ? (<Fragment>
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
                                                            date ? (<Fragment>
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
                                                            prevReaded !== msg.readed ? (<Fragment>
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

                                                <div key={Math.random()} className={`message self ${flowMsgNext ? 'not-main' : ''} `} >
                                                    {
                                                        !flowMsgPrev && flowMsgNext && !center ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{role ? role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }
                                                    {
                                                        !flowMsgNext && !flowMsgPrev ? (<Fragment>
                                                            <div className="msg_header">
                                                                {/* <span>{user.username}</span> */}
                                                                <span className="msg-role">{role ? role.name : ''}</span>
                                                            </div>
                                                        </Fragment>) : (<Fragment></Fragment>)
                                                    }

                                                    <div className="message-wrapper">
                                                        <div className={`message-content ${flowMsgNext ? 'not-main' : ''} `}>
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
                                                        !flowMsgNext ? (<Fragment>
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
                        <div className="inputer">
                            <div className="input-container">
                                <div className="inputer_btn">
                                    <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === 'attacments'} content={<DropDownAttacments />} trigger="click">
                                        <Button onClick={() => { switcher === 'attacments' ? setSwitcher('') : setSwitcher('attacments') }} className='transparent'>
                                            <Icon className='icon_m blue-lite' name='solid_paperclip' />
                                        </Button>
                                    </Popover>
                                </div>

                                <div className="main_input">


                                    {
                                        selectedMsg ? (<Fragment>
                                            <div className="selected-container">
                                                {selectedMsg['content']}
                                            </div>
                                        </Fragment>) : (<Fragment></Fragment>)
                                    }

                                    <TextArea onKeyDown={(e) => handleKeyDown(e)} onKeyUp={(e) => handleKeyUp(e)} onPressEnter={() => handleEnter()} onFocus={() => onFocusInput()} autoSize placeholder='Ваше сообщение' onChange={(e) => onChange(activeContact.id, e.target.value, e)} value={draft[activeContact.id + status]} />

                                </div>
                                <div className="inputer_btn">
                                    <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === 'social'} content={<SocialMenu selectSocial={selectSocial} />} trigger="click">
                                        <Button onClick={() => setSwitcher('social')} className='transparent'>
                                            <Icon className='icon_l' name={`social_media_${currentChat.activeSocial}`} />
                                        </Button>
                                    </Popover>
                                </div>
                            </div>
                            <div onClick={() => onSend()} className="send_btn">
                                <Icon className='icon_x white' name='solid_another-arrow' />
                            </div>
                        </div>
                    </Fragment>) : (
                            <Fragment>
                                <div className="start_chat_page">
                                    <div className="avatar avatar-lg mb-2">
                                        <img className="avatar-img" src={hero ? hero.avatar : 'https://via.placeholder.com/150'} alt=""></img>
                                    </div>
                                    <h5>
                                        Привет, {hero ? hero.username : 'Пользователь'}
                                    </h5>
                                    <p className="text-muted">
                                        Выбирай контакт слева чтобы начать общаться
                                    </p>
                                </div>
                            </Fragment>
                        )
                }

            </div >
        );
    }));

export default Chat;
