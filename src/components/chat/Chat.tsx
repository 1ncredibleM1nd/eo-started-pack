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
        const hero = userStore.hero
        const [draft, setDraft] = useState({})
        const [render, startRender] = useState(false)
        const [switcher, setSwitcher] = useState('')

        let currentChat: any;
        if (chatStore.chat && activeContact) {
            currentChat = chatStore.getCurrentChat(activeContact.id)
        }

        useEffect(() => {
            if (activeContact && !draft[activeContact.id]) $('.main_input input').val('');
        })

        const onChange = (name: string, value: string) => {
            setDraft({ ...draft, [name]: value })
            startRender(!render)
        }

        const onSend = () => {
            $('.main_input input').val('');
            setDraft({ ...draft, [activeContact.id]: '' })
            chatStore.addMsg(currentChat.id, draft[activeContact.id], hero.id, currentChat.activeSocial)
            console.log($(".msg").last().offset().top)
            $('.msg_space').animate({
                scrollTop: $(".msg").last().offset().top
            }, 300);
        }

        const DropDownMenu = () => {
            return (
                <Menu>
                    <Menu.Item>
                        Редактировать
                    </Menu.Item>
                    <Menu.Item>
                        Выбрать
                    </Menu.Item>
                    <Menu.Item>
                        Удалить
                    </Menu.Item>
                    <Menu.Item>
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

                                    console.log(msg.smiles)

                                    if (user.id !== hero.id) {
                                        return (
                                            <div key={Math.random()} className="message">

                                                <div className="msg_header">
                                                    <span>{user.username}</span>
                                                    <span className="msg-role">{role ? role.name : ''}</span>
                                                </div>

                                                <div className="message-wrapper">
                                                    <div className="message-content">
                                                        <div className="inset_border_container">
                                                            <div className="dummy"></div>
                                                            <div className="border_hero"></div>
                                                        </div>
                                                        <span>
                                                            {msg.content}
                                                        </span>
                                                        <div className="smile">
                                                            <Popover visible={switcher === msg.id} content={<SmileMenu id={msg.id} chat_id={currentChat.id} switcherOff={switcherOff} />} trigger="click">
                                                                <Button onClick={() => setSwitcher(msg.id)} className='transparent'>
                                                                    <Icon className='icon_s active-grey' name='regular_smile' />
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
                                                        <div className="msg_time">{msg.time}</div>
                                                    </span>

                                                    <Dropdown overlay={<DropDownMenu />} placement="bottomLeft" >
                                                        <span className='dropdown-trigger'>
                                                            <Icon className=' active-grey' name={`regular_three-dots`} />
                                                        </span>
                                                    </Dropdown>

                                                    {/* <MessageDropdown /> */}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div key={Math.random()} className="message self">
                                                <div className="message-wrapper">
                                                    <div className="message-content">
                                                        <span>
                                                            {msg.content}
                                                        </span>
                                                    </div>
                                                    <span className="message-status self">
                                                        {msg.time}
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
                                    <TextArea autoSize placeholder='Ваше сообщение' onChange={(e) => onChange(activeContact.id, e.target.value)} value={draft[activeContact.id]} />
                                </div>
                                <div className="inputer_btn">
                                    <Popover visible={switcher === 'social'} content={<SocialMenu selectSocial={selectSocial} />} trigger="click">
                                        <Button onClick={() => setSwitcher('social')} className='transparent'>
                                            <Icon className='icon_m' name={`social_media_${currentChat.activeSocial}`} />
                                        </Button>
                                    </Popover>
                                </div>

                            </div>
                            <div onClick={() => onSend()} className="send_btn">
                                <Icon className='icon_m white' name='solid_location-arrow' />
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
