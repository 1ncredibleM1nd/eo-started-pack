import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IMsg, IContactStore, IUserStore } from '@stores/interface';
import { Icon } from '@ui'
import $ from 'jquery'
import { Input, Menu, Dropdown, Button, Popover } from 'antd';
import SmileMenu from './comp/SmileMenu'
import './Chat.scss'
import SocialMenu from './comp/SocialMenu'





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

            if (activeContact && !draft[activeContact.id + status]) $('.main_input input').val('');
        })

        const onChange = (name: string, value: string) => {

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

            switch (status) {
                case 'default':
                    if (draft[activeContact.id + status].length) {
                        chatStore.addMsg(currentChat.id, draft[activeContact.id + status], hero.id, currentChat.activeSocial, null)
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
            $('.msg_space').animate({
                scrollTop: $(".message").last().offset().top
            }, 300);
        }

        const DropDownMenu = (msg: any) => {
            console.log('id', msg.id)
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


        const selectSocial = (social: string) => {
            currentChat.changeSocial(social)
            switcherOff()
        }

        const switcherOff = () => {
            setSwitcher('')
        }





        const { TextArea } = Input;



        return (
            <div className="chat">
                {
                    currentChat != undefined ? (<Fragment>
                        <div className="msg_space">
                            {
                                currentChat.msg.map((msg: IMsg, index: number) => {
                                    let user = currentChat.user.find((user: any) => user.id === msg.from)
                                    let role = currentChat.role.find((role: any) => role.id === msg.from)

                                    if (user.id !== hero.id) {
                                        return (
                                            <div key={Math.random()} className="message">
                                                <div className="msg_header">
                                                    <span>{user.username}</span>
                                                    <span className="msg-role">{role ? role.name : ''}</span>
                                                </div>
                                                <div className="message-wrapper">
                                                    <div className="message-content">
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
                                                        <div className={`smile ${switcher === msg.id ? 'active' : ''}`}>
                                                            <Popover onVisibleChange={(e) => { e ? {} : setSwitcher('') }} visible={switcher === msg.id} content={<SmileMenu id={msg.id} chat_id={currentChat.id} switcherOff={switcherOff} />} trigger="click">
                                                                <Button onClick={() => { switcher === msg.id ? setSwitcher('') : setSwitcher(msg.id) }} className='transparent'>
                                                                    <Icon className={`icon_s active-grey`} name='regular_smile' />
                                                                </Button>
                                                            </Popover>
                                                        </div>
                                                        <div className="smile_realization">
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="message-options">
                                                    <div className="avatar avatar-sm">
                                                        <div className={`social_media_icon ${msg.social_media}`}>
                                                            <Icon className='icon_s' name={`social_media_${msg.social_media}`} />
                                                        </div>
                                                        <img src={user.avatar} alt="" />
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
                                                        <Dropdown overlay={<DropDownMenu id={msg.id} />} placement="bottomLeft" >
                                                            <span className='dropdown-trigger'>
                                                                <Icon className='active-grey' name={`regular_three-dots`} />
                                                            </span>
                                                        </Dropdown>
                                                    </span>
                                                    {/* <MessageDropdown /> */}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={Math.random()} className="message self">
                                                <div className="message-wrapper">
                                                    <div className="message-content">
                                                        {
                                                            msg.reply ? (<Fragment>
                                                                <div className="reply">
                                                                    <span>
                                                                        {msg.reply.content}
                                                                    </span>
                                                                </div>
                                                            </Fragment>) : (<Fragment></Fragment>)
                                                        }
                                                        <span>
                                                            {msg.content}
                                                        </span>
                                                    </div>
                                                    <span className="message-status self">
                                                        <Dropdown overlay={<DropDownMenu id={msg.id} />} placement="bottomLeft" >
                                                            <span className='dropdown-trigger'>
                                                                <Icon className='active-grey' name={`regular_three-dots`} />
                                                            </span>
                                                        </Dropdown>
                                                        {msg.time}
                                                        {
                                                            msg.editted ? (<Fragment>
                                                                <div className="editted_icon">
                                                                    <Icon className='active-grey' name={`solid_pencil-alt`} />
                                                                    {' '}
                                                                    Редак.
                                                                </div>
                                                            </Fragment>) : (<Fragment></Fragment>)
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="inputer">
                            <div className="input-container">

                                <div className="inputer_btn">
                                    <Icon className='icon_m blue-lite' name='solid_paperclip' />
                                </div>
                                <div className="main_input">
                                    {
                                        selectedMsg ? (<Fragment>
                                            <div className="selected-container">
                                                {selectedMsg['content']}
                                            </div>
                                        </Fragment>) : (<Fragment></Fragment>)
                                    }
                                    <TextArea autoSize placeholder='Ваше сообщение' onChange={(e) => onChange(activeContact.id, e.target.value)} value={draft[activeContact.id + status]} />
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
                                <Icon className='icon_x white' name='solid_arrow-send' />
                            </div>
                        </div>
                    </Fragment>) : (
                            <Fragment></Fragment>
                        )
                }
            </div >
        );
    }));

export default Chat;
