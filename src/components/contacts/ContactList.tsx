import React, { useRef } from "react";
import { observer } from "mobx-react-lite";
import HashLoader from "react-spinners/HashLoader";
import "./ContactList.scss";
import "./Contact.scss";
import { Conversation, Message } from "@/entities";
import ContactItem from "./comp/ContactItem";
import { useStore } from "@/stores";

type IProps = {
  onSelect?: () => void | null;
};

const ContactList = observer(({ onSelect }: IProps) => {
  const { contactStore, appStore, userStore } = useStore();
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
      .querySelector(`.contacts-item-${ContactsData.length - 1}`)
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

  return (
    <div className={`menu_list ${filterSwitch ? "active" : ""}`}>
      <div className="tab-content">
        <div className="tab-pane active" id="chats-content">
          <div className="scroller d-flex flex-column h-100">
            <div
              onScrollCapture={handleScroll}
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
                  if (!contact) return null;

                  const lastMessage: Message = contact.getLastMessage();
                  const online: boolean = false;
                  const school: any = appStore.schoolList[contact.schoolId];

                  return (
                    <ContactItem
                      isIAm={
                        lastMessage &&
                        !lastMessage.income &&
                        lastMessage.user &&
                        lastMessage.user.id === userStore.hero.id
                      }
                      isManager={
                        lastMessage && !lastMessage.income && lastMessage.user
                      }
                      index={index}
                      lastMessage={lastMessage}
                      key={`contacts_item_${index}`}
                      contact={contact}
                      online={online}
                      active={
                        contactStore.activeContact &&
                        contactStore.activeContact.id === contact.id
                      }
                      selectContact={selectContact}
                      school={school}
                    />
                  );
                })}

                {ContactsData && !ContactsData.length && (
                  <li className={`contacts-item friends`}>
                    <div className="announcement">Контактов нет ¯\_(ツ)_/¯</div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ContactList;
