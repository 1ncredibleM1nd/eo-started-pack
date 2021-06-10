import React, { Fragment, useRef } from "react";
import { inject, observer } from "mobx-react";
import IStores, {
  IAppStore,
  IChatStore,
  IContactStore,
  IUserStore,
} from "@stores/interface";
import { Badge } from "antd";
import HashLoader from "react-spinners/HashLoader";
import "./ContactList.scss";
import "./Contact.scss";
import { Icon } from "@ui";
import moment from "moment";
import { UserAvatar } from "@components/user_info/UserAvatar";
import { Conversation, Message, User } from "../../entities";

type IProps = {
  contactStore?: IContactStore;
  stores?: IAppStore;
  userStore?: IUserStore;
  chatStore?: IChatStore;
  appStore?: IAppStore;
  onSelect?: () => void | null;
};

const ContactList = inject((stores: IStores) => ({
  contactStore: stores.contactStore,
  userStore: stores.userStore,
  chatStore: stores.chatStore,
  appStore: stores.appStore,
}))(
  observer((props: IProps) => {
    const { contactStore, appStore, onSelect, userStore } = props;
    let ContactsData = contactStore.contact;
    const filterSwitch = contactStore.filterSwitch;

    const contactRef = useRef(null);

    const selectContact = async (id: any) => {
      if (onSelect) {
        onSelect();
      }

      contactStore.setActiveContact(id);
      appStore.setLayout("chat");
    };

    const handleScroll = () => {
      if (!contactRef.current) return;
      let parentPos = document
        .querySelector("#chatContactsList")
        .getBoundingClientRect();
      let childPos = document
        .querySelector(`.contact-item-${ContactsData.length - 1}`)
        .getBoundingClientRect();
      let topOfLastContact = childPos.bottom - parentPos.bottom;

      if (topOfLastContact <= 10) {
        contactStore.loadContact();
      }
    };

    if (!appStore.isLoaded) {
      return (
        <div className="loading">
          <HashLoader color="#3498db" size={50} />
        </div>
      );
    }

    const contactTime = (message: Message) => {
      let now = moment(new Date());
      let contactDate = moment(message.date, "DD.MM.YY");
      let diff = now.diff(contactDate, "days");

      if (diff === 0) {
        return <span>{message.time}</span>;
      } else if (diff <= 7) {
        return <span>{contactDate.format("dd")}</span>;
      } else {
        return <span>{message.date}</span>;
      }
    };

    return (
      <div className={`menu_list ${filterSwitch ? "active" : ""}`}>
        <div className="tab-content">
          <div className="tab-pane active" id="chats-content">
            <div className="scroller d-flex flex-column h-100">
              <div
                onScroll={handleScroll}
                className="hide-scrollbar h-100"
                id="chatContactsList"
                ref={contactRef}
              >
                <ul
                  className="contacts-list"
                  id="chatContactTab"
                  data-chat-list=""
                >
                  {ContactsData.map((contact: Conversation, index: number) => {
                    if (!contact) {
                      return null;
                    }

                    const lastMessage: Message = contact.getLastMessage();
                    const user: User = contact.user;

                    const online: boolean = false;
                    let social_media: string = "";
                    let status: string = "read";

                    if (lastMessage) {
                      if (lastMessage.income && !lastMessage.readed) {
                        status = "unread";
                      }

                      social_media = lastMessage.social_media;
                    }

                    const isIAm =
                      lastMessage &&
                      !lastMessage.income &&
                      lastMessage.user &&
                      lastMessage.user.id === userStore.hero.id;

                    return (
                      <li
                        onClick={() => selectContact(contact.id)}
                        className={`contacts-item friends contact-item-${index}
                                                    ${
                                                      contactStore.activeContact &&
                                                      contactStore.activeContact
                                                        .id === contact.id
                                                        ? "active"
                                                        : ""
                                                    }`}
                        key={index}
                      >
                        <div className="avatar">
                          <div
                            className={`social_media_icon white ${social_media}`}
                          >
                            <Icon
                              className="icon_s"
                              name={`social_media_${social_media}`}
                            />
                          </div>
                          <Badge
                            className={`online_dot ${
                              contactStore.activeContact &&
                              contactStore.activeContact.id === contact.id
                                ? "active"
                                : ""
                            }`}
                            dot={online}
                          >
                            <UserAvatar
                              size="48"
                              user={user}
                              round={true}
                              textSizeRatio={1.75}
                            />
                          </Badge>
                        </div>
                        <div className="contacts-content">
                          <div className="contacts-info">
                            <h4 className="chat-name user_name_to">
                              {user.username}
                            </h4>
                            <div className="chat-time">
                              {lastMessage ? (
                                <Fragment>{contactTime(lastMessage)}</Fragment>
                              ) : (
                                <Fragment></Fragment>
                              )}
                            </div>
                          </div>
                          <div className="contacts-texts">
                            {lastMessage ? (
                              <Fragment>
                                <div className={`last_msg ${status}`}>
                                  {isIAm ? <div className="from">Ты:</div> : ""}
                                  {lastMessage.content}
                                  {status === "unread" && (
                                    <>
                                      <Fragment>&nbsp;</Fragment>
                                      <div className="unreaded_count"></div>
                                    </>
                                  )}
                                </div>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <div className={`last_msg ${status}`}>
                                  *Добавлен в контакты*
                                </div>
                              </Fragment>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  {ContactsData && !ContactsData.length ? (
                    <Fragment>
                      <li className={`contacts-item friends`}>
                        <div className="announcement">
                          Контактов нет ¯\_(ツ)_/¯
                        </div>
                      </li>
                    </Fragment>
                  ) : (
                    <Fragment />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default ContactList;
