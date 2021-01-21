import React from 'react';
import { inject, observer } from 'mobx-react';
import IStores, { IAppStore, IChatStore, IContactStore, IUserStore } from '@stores/interface';


type IProps = {
    contactStore?: IContactStore,
    stores?: IAppStore,
    userStore?: IUserStore
    chatStore?: IChatStore
    appStore?: IAppStore
}

const MenuList = inject((stores: IStores) => ({ contactStore: stores.contactStore, userStore: stores.userStore, chatStore: stores.chatStore, appStore: stores.appStore }))(
    observer((props: IProps) => {

        const { contactStore, chatStore, appStore } = props;
        const ContactsData = contactStore.contact


        if (!appStore.loaded) {
            return <div className="loading">Загрузка...</div>
        }
        return (
            <div className="menu_list">
                {
                    ContactsData.map((contact: any, index: number) => {

                        const last_msg = chatStore.getLastMsg(contact.id)

                        return (
                            <div onClick={() => contactStore.setActiveContact(contact.id)} className="contact_item">
                                <div className="avatar">
                                    <img src={contact.avatar} alt="" />
                                </div>
                                <div className="content">
                                    <div className="header">
                                        <div className="name">
                                            {contact.name}
                                        </div>
                                        <div className="date_last_msg">
                                            Date
                                        </div>
                                    </div>
                                    <div className="last_msg">
                                        {last_msg}
                                    </div>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        );
    }));

export default MenuList;
