import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IChatStore, IUserStore } from '@stores/interface';
import { Modal } from 'antd';
import ContactList from '../contacts/ContactList'
import './Header.scss'

type IProps = {
    chatStore?: IChatStore,
    userStore?: IUserStore,
}

const Header = inject((stores: IStores) => ({ chatStore: stores.chatStore, userStore: stores.userStore }))(
    observer((props: IProps) => {

        const { chatStore, userStore } = props;
        const [modal, setModal] = useState(false);

        const chat = chatStore.activeChat
        let activeMsg: any;
        let hero: any;
        let user: any;

        if (chat) {
            activeMsg = chat.active_msg
            hero = userStore.hero
            user = chat.user.find((user: any) => user.id !== hero.id)
        }

        const onDelete = () => {
            chatStore.deleteMsg(activeMsg.id, chat.id)
            chat.setActiveMsg(null)
        }

        const onClose = () => {
            chat.setActiveMsg(null)
        }

        const handleSelect = () => {
            setModal(false)
            chat.setActiveMsg(null)
        }

        const handleCancel = () => {

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
                            user ? (<Fragment>
                                <div className="header_content">
                                    <div className="header_user_name">
                                        {user.username}
                                    </div>
                                </div>
                            </Fragment>) : (<Fragment></Fragment>)
                        }

                    </Fragment>)
                }


                <Modal title="Выберите диалог" visible={modal} onOk={handleSelect} onCancel={handleCancel} footer={[
                    <Fragment></Fragment>
                ]}>
                    <div className="reply_contact">
                        <ContactList onSelect={() => handleSelect()} />
                    </div>
                </Modal>
            </div>
        );
    }));

export default Header;
