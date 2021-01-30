import React, { Fragment, useState } from 'react';
import ModalWindow from './ModalWindow'
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IContactStore, IUserStore, IAppStore } from '@stores/interface';
import { Button, Popover, Menu } from 'antd';
import './Header.scss'
import { Icon } from '@ui'



type IProps = {
    chatStore?: IChatStore,
    userStore?: IUserStore,
    contactStore?: IContactStore
    appStore?: IAppStore
}

const Header = inject((stores: IStores) => ({ appStore: stores.appStore, chatStore: stores.chatStore, userStore: stores.userStore, contactStore: stores.contactStore }))(
    observer((props: IProps) => {

        const { chatStore, userStore, contactStore, appStore } = props;
        const [modal, setModal] = useState(false);

        let hero = userStore.hero
        const chat = chatStore.activeChat
        let activeMsg: any;
        let user: any;
        let chatTitle: any;

        if (chat) {
            activeMsg = chat.active_msg
            let contact = contactStore.getContact(chat.contact_id)
            chatTitle = contact.name
            if (chat.user && chat.user.length <= 2) {
                let userId = chat.user.find((id: any) => id !== hero.id)
                user = userStore.getUser(userId)
            }
        }


        const onDelete = () => {
            chatStore.deleteMsg(activeMsg.id, chat.id)
            chat.setActiveMsg(null)
        }

        const onClose = () => {
            chat.setActiveMsg(null)
        }


        const openProfile = (type: string) => {
            chatStore.setModalWindow(type)
            setModal(false)
        }

        const editContact = () => {

        }

        const deleteContact = () => {

        }

        const deleteChat = () => {

        }

        const clearHistory = () => {

        }

        const blockUser = () => {

        }

        const deleteExit = () => {

        }


        const DropDownMenu = (msg: any) => {

            if (user) {
                return (
                    <Menu>
                        <Menu.Item onClick={() => openProfile('user')}>
                            Профиль
                        </Menu.Item>
                        <Menu.Item onClick={() => editContact()}>
                            Редакт. Контакт
                    </Menu.Item>
                        <Menu.Item onClick={() => deleteContact()}>
                            Удалить Контакт
                    </Menu.Item>
                        <Menu.Item onClick={() => deleteChat()} >
                            Удалить чат
                    </Menu.Item>
                        <Menu.Item onClick={() => clearHistory()} >
                            Очистить историю
                    </Menu.Item>
                        <Menu.Item onClick={() => blockUser()} >
                            Заблокировать
                    </Menu.Item>
                        {/* <Menu.Item onClick={() => replyMsg(msg.id)} >
                        Экспортировать чат
                    </Menu.Item> */}
                    </Menu>
                )
            } else {
                return (
                    <Menu>
                        <Menu.Item onClick={() => openProfile('group')}>
                            Настройки группы
                    </Menu.Item>
                        <Menu.Item onClick={() => deleteExit()}>
                            Удалить и выйти
                    </Menu.Item>
                        <Menu.Item onClick={() => deleteChat()} >
                            Удалить чат
                    </Menu.Item>
                        <Menu.Item onClick={() => clearHistory()} >
                            Очистить историю
                    </Menu.Item>
                        {/* <Menu.Item onClick={() => replyMsg(msg.id)} >
                        Экспортировать чат
                    </Menu.Item> */}
                    </Menu>
                )
            }
        }

        const closeConctact = () => {
            if (appStore.layout === 'contact') {
                appStore.setLayout('info')
            } else if (appStore.layout === 'info') {
                appStore.setLayout('contact')
            } else if (appStore.layout === 'chat') {
                contactStore.setActiveContact(null)
                appStore.setLayout('contact')
            }
        }


        return (
            <div className="chat_header">
                {
                    activeMsg ? (<Fragment>
                        <div className="header_content select">
                            <div className="left">
                                <div onClick={() => setModal(true)} className="header_select_btn">
                                    Переслать
                                </div>
                                <div onClick={() => onDelete()} className="header_select_btn">
                                    Удалить
                                </div>
                            </div>
                            <div className="right">
                                <div onClick={() => onClose()} className="header_select_btn cancel">
                                    Отменить
                                </div>
                            </div>

                        </div>
                    </Fragment>) : (<Fragment>
                        {
                            chatTitle || user ? (<Fragment>
                                <div className="header_content">

                                    <div className={`back_trigger ${appStore.layout !== 'contact' ? 'active' : ''}`}>
                                        <Button onClick={() => closeConctact()} className='transparent'>
                                            <Icon className='icon_s blue-lite' name={`solid_arrow-left`} />
                                        </Button>
                                    </div>

                                    <div className={`header_title ${user ? 'user' : ''}`}>
                                        <div className='title'>
                                            {chatTitle}
                                        </div>
                                        {
                                            user ? (<Fragment>
                                                <div className="social-online">
                                                    {
                                                        Object.keys(user.online).map(function (key, index) {
                                                            return (
                                                                <div className="online_item">
                                                                    <Icon className='icon_s active-grey' name={`social_media_${key}`} />
                                                                    <span>
                                                                        {
                                                                            user.online[key] === 'В сети' ? (<Fragment>
                                                                                <div className="online_dot_header"></div>
                                                                            </Fragment>) : (<Fragment>{user.online[key]}</Fragment>)
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </Fragment>) : (<Fragment></Fragment>)
                                        }
                                        <div className="header_settings">
                                            <div className="trigger">
                                                <Popover visible={modal} content={<DropDownMenu />} trigger="click">
                                                    <Button onClick={() => setModal(!modal)} className='transparent'>
                                                        <Icon className='icon_s lite-grey rotated' name={`regular_three-dots`} />
                                                    </Button>
                                                </Popover>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="header_info">
                                        <Button onClick={() => appStore.setLayout('info')} className='transparent'>
                                            <Icon className='icon_l lite-grey' name={`solid_users-cog`} />
                                        </Button>
                                    </div>
                                </div>
                            </Fragment>) : (<Fragment>

                            </Fragment>)
                        }
                    </Fragment>)
                }
                <ModalWindow />
            </div>
        );
    }));

export default Header;
