import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IContactStore, IUserStore, } from '@stores/interface';
// import { SettingsModal, Button, Popover, Menu, Divider, Switch, Collapse, Badge } from 'antd';
import './ModalWindow.scss'
// import { Icon } from '@ui'

type IProps = {
    chatStore?: IChatStore,
    userStore?: IUserStore,
    contactStore?: IContactStore
}

const ModalWindow = inject((stores: IStores) => ({ chatStore: stores.chatStore, userStore: stores.userStore, contactStore: stores.contactStore }))(
    observer((props: IProps) => {

        const { chatStore } = props;

        // const [switcher, setSwitcher] = useState(false)
        // const [attachmentLimit, setAttachmentLimit] = useState(4)

        //const status = chatStore.modalWindow
        const chat = chatStore.activeChat
        //let hero = userStore.hero
        //let contact: any
        // let user: any;

        if (chat) {
            if (chat.user && chat.user.length <= 2) {
                //let userId = chat.user.find((id: any) => id !== hero.id)
                //user = userStore.getUser(userId)
            }
            //contact = contactStore.getContact(chat.contact_id)
        }


        // const handleSelect = () => {

        // }

        // const handleCancel = () => {
        //     chatStore.setModalWindow('close')
        // }

        // const editContact = () => {

        // }
        // const deleteContact = () => {

        // }
        // const blockUser = () => {

        // }

        // const addFavorite = () => {

        // }

        // const shareContact = () => {

        // }

        // const editUser = () => {

        // }

        // const exitDelete = () => {

        // }

        // const openUser = (userId: string) => {

        // }

        // const addUser = () => {

        // }


        // const DropDownMenu = () => {

        //     if (status === 'group') {
        //         return (
        //             <Menu>
        //                 <Menu.Item onClick={() => shareContact()} >
        //                     Поделится группой
        //                 </Menu.Item>
        //                 <Menu.Item onClick={() => deleteContact()}>
        //                     Очистить историю
        //             </Menu.Item>
        //                 <Menu.Item onClick={() => addFavorite()} >
        //                     Удалить чат
        //             </Menu.Item>
        //                 <Menu.Item onClick={() => blockUser()} >
        //                     Удалить и выйти
        //             </Menu.Item>
        //             </Menu>
        //         )
        //     }
        //     if (status === 'user') {
        //         return (
        //             <Menu>
        //                 <Menu.Item onClick={() => shareContact()} >
        //                     Поделится контактом
        //                 </Menu.Item>
        //                 <Menu.Item onClick={() => editContact()}>
        //                     Редакт. Контакт
        //                 </Menu.Item>
        //                 <Menu.Item onClick={() => deleteContact()}>
        //                     Удалить контакт
        //                 </Menu.Item>
        //                 <Menu.Item onClick={() => addFavorite()} >
        //                     Добавить в избранное
        //                 </Menu.Item>
        //                 <Menu.Item onClick={() => blockUser()} >
        //                     Заблокировать
        //                 </Menu.Item>
        //             </Menu>
        //         )
        //     }
        //     return null
        // }

        // const { Panel } = Collapse;

        return (
            <Fragment>
                {/*
                <SettingsModal title="Настройки группы" visible={status === 'group'} onOk={handleSelect} onCancel={handleCancel} footer={[<Fragment></Fragment>]}>
                    {
                        contact ? (<Fragment>
                            <div className="modal_window">
                                <div className="modal_content">
                                    <div className="header">
                                        <div className="avatar">
                                            <img src={contact.avatar} alt="" />
                                        </div>
                                        <div className="user_title">
                                            {contact.name}
                                        </div>
                                        <div className="trigger">
                                            <Popover onVisibleChange={(e) => { e ? {} : setSwitcher(false) }} visible={switcher} content={<DropDownMenu />} trigger="click">
                                                <Button onClick={() => setSwitcher(!switcher)} className='transparent'>
                                                    <Icon className='icon_s lite-grey rotated' name={`regular_three-dots`} />
                                                </Button>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div className="user_btns">
                                        <div className="btn_item notification">
                                            <div className="notification">
                                                <div className="text">
                                                    Уведобления
                                            </div>
                                                <Switch defaultChecked />
                                            </div>
                                        </div>
                                        <div className="btn_item" onClick={() => blockUser()}>
                                            Поделится группой
                                </div>
                                        <div className="btn_item" onClick={() => addFavorite()}>
                                            Добавить в избранное
                                    </div>
                                        <div className="btn_item red" onClick={() => exitDelete()}>
                                            Выйти и удалить
                                </div>
                                    </div>

                                    <Divider orientation="left">Участники</Divider>

                                    <div className="users">
                                        {
                                            contact.user.map((userId: any) => {
                                                let user = userStore.getUser(userId)
                                                let userOnline = Object.keys(user.online).find(key => user.online[key] === 'В сети')
                                                if (user) {
                                                    return (

                                                        <div className="user_item" onClick={() => openUser(userId)}>
                                                            <div className="avatar">
                                                                <Badge className='online_dot' dot={Boolean(userOnline)}>
                                                                    <img src={user.avatar} alt="" />
                                                                </Badge>
                                                            </div>
                                                            <div className="name">
                                                                {user.username}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            })
                                        }

                                        <div className="user_item" onClick={() => addUser()}>
                                            <span>
                                                Добавить участника  <Icon className='lite-grey' name={`solid_plus`} />
                                            </span>

                                        </div>
                                    </div>
                                    <Divider orientation="left">Вложения</Divider>
                                    <div className="attachments">
                                        <div className="content">
                                            {
                                                contact.attachments.map((item: any, index: number) => {
                                                    if (index < attachmentLimit) {
                                                        return (
                                                            <div className="attachment_item">
                                                                <div className={`social_media_icon white ${item.social_media}`}>
                                                                    <Icon className='icon_s' name={`social_media_${item.social_media}`} />
                                                                </div>
                                                                <div className="img_container">
                                                                    <img src={item.url} alt="" />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                })
                                            }
                                        </div>

                                        <div onClick={() => setAttachmentLimit(attachmentLimit === 4 ? 20 : 4)} className="lil_text_btn">
                                            {attachmentLimit === 4 ? 'Показать больше' : 'Скрыть'}
                                        </div>
                                    </div>

                                </div>
                            </div >
                        </Fragment>) : (<Fragment></Fragment>)
                    }
                </SettingsModal >

                <SettingsModal title="Профиль пользователя" visible={status === 'user'} onOk={handleSelect} onCancel={handleCancel} footer={[<Fragment></Fragment>]}>

                    {
                        user ? (<Fragment>
                            <div className="modal_window">
                                <div className="modal_content">
                                    <div className="header">
                                        <div className="avatar">
                                            <img src={user.avatar} alt="" />
                                        </div>
                                        <div className="user_title">
                                            {user.username}
                                        </div>
                                        <div className="trigger">
                                            <Popover onVisibleChange={(e) => { e ? {} : setSwitcher(false) }} visible={switcher} content={<DropDownMenu />} trigger="click">
                                                <Button onClick={() => setSwitcher(!switcher)} className='transparent'>
                                                    <Icon className='icon_s lite-grey rotated' name={`regular_three-dots`} />
                                                </Button>
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="user_btns">

                                        <div className="btn_item notification">
                                            <div className="notification">
                                                <div className="text">
                                                    Уведобления
                                            </div>
                                                <Switch defaultChecked />
                                            </div>
                                        </div>

                                        <div className="btn_item" onClick={() => blockUser()}>
                                            Поделится контактом
                                    </div>
                                        <div className="btn_item" onClick={() => editUser()}>
                                            Редактировать контакт
                                    </div>
                                        <div className="btn_item" onClick={() => addFavorite()}>
                                            Добавить в избранное
                                    </div>
                                        <div className="btn_item" onClick={() => blockUser()}>
                                            Заблокировать
                                    </div>
                                        <div className="btn_item red" onClick={() => deleteContact()}>
                                            Удалить контакт
                                    </div>
                                    </div>



                                    <div className="user_info">
                                        <Divider orientation="left">Профили</Divider>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>

                                        <Collapse bordered={false} accordion  >
                                            {
                                                Object.keys(user.info).map((key, index) => {
                                                    return (
                                                        <Panel className='modal_window_panel' header={<Fragment>
                                                            <Icon name={`social_media_${key}`} className='icon_s' />
                                                            <span className='social'>
                                                                {key}
                                                            </span>

                                                            {
                                                                user.online[key] === 'В сети' ? (<Fragment>
                                                                    <div className="online_dot_header"></div>
                                                                </Fragment>) : (<Fragment>
                                                                    <span>
                                                                        {user.online[key]}
                                                                    </span>
                                                                </Fragment>)
                                                            }

                                                        </Fragment>} key={index}>
                                                            {
                                                                Object.keys(user.info[key]).map((key2, index) => {
                                                                    let info_item = user.info[key][key2]

                                                                    if (key2 === 'nickname') {
                                                                        return (
                                                                            <div className='info_item'>
                                                                                <span>Никнейм:</span> {info_item}
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (key2 === 'about') {
                                                                        return (
                                                                            <div className='info_item'>
                                                                                <span>Bio:</span> {info_item}
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (key2 === 'phone') {
                                                                        return (
                                                                            <div className='info_item'>
                                                                                <span>Телефон:</span> {info_item}
                                                                            </div>
                                                                        )
                                                                    }
                                                                    if (key2 === 'link') {
                                                                        return (
                                                                            <div className='info_item'>
                                                                                <span>Ссылка:</span> <a href={info_item}>{info_item}</a>
                                                                            </div>
                                                                        )
                                                                    }
                                                                    return null

                                                                })
                                                            }
                                                        </Panel>
                                                    )
                                                })
                                            }
                                        </Collapse>
                                    </div>
                                    <Divider orientation="left">Вложения</Divider>

                                    <div className="attachments">
                                        <div className="content">
                                            {
                                                contact.attachments.map((item: any, index: number) => {
                                                    if (index < attachmentLimit) {
                                                        return (
                                                            <div className="attachment_item">
                                                                <div className={`social_media_icon white ${item.social_media}`}>
                                                                    <Icon className='icon_s' name={`social_media_${item.social_media}`} />
                                                                </div>
                                                                <div className="img_container">
                                                                    <img src={item.url} alt="" />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return null
                                                })
                                            }
                                        </div>

                                        <div onClick={() => setAttachmentLimit(attachmentLimit === 4 ? 20 : 4)} className="lil_text_btn">
                                            {attachmentLimit === 4 ? 'Показать больше' : 'Скрыть'}
                                        </div>
                                    </div>
                                </div>

                            </div >
                        </Fragment>) : (<Fragment></Fragment>)
                    }
                </SettingsModal > */}
            </Fragment >

        );
    }));

export default ModalWindow;
