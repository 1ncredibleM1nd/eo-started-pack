import React, { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import HashLoader from "react-spinners/HashLoader";
import "./ContactList.scss";
import "./Contact.scss";
import { Conversation, Message } from "@/entities";
import { Link } from "react-router-dom";
import ContactItem from "./comp/ContactItem";
import { useStore } from "@/stores";
import { useInView } from "react-intersection-observer";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import PuffLoader from "react-spinners/PuffLoader";
import { css } from "goober";

type IProps = {
  onSelect?: () => void | null;
};

const ContactList = observer(({ onSelect }: IProps) => {
  const { contactStore, appStore, schoolsStore, usersStore, chatStore } =
    useStore();
  const query = useLocationQuery();
  const ContactsData = contactStore.contact;
  const filterSwitch = contactStore.filterSwitch;

  const { ref: sentryPrevRef, inView: isVisiblePrev } = useInView({
    initialInView: true,
  });
  const { ref: sentryNextRef, inView: isVisibleNext } = useInView();

  const trackScrollPosition = useCallback((node) => {
    const id = query.get("im");
    console.log("call");
    if (node && id) {
      setTimeout(() => {
        document.getElementById(`contacts_item_${id}`).scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (isVisiblePrev) {
      contactStore.loadPrev();
    }
  }, [contactStore, isVisiblePrev]);

  useEffect(() => {
    if (isVisibleNext) {
      contactStore.loadNext();
    }
  }, [contactStore, isVisibleNext]);

  const selectContact = async (id: any) => {
    if (onSelect) {
      onSelect();
    }
  };

  const setUnreadChat = async (id: any) => {
    chatStore.setUnreadChat(id);
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
            <div className="hide-scrollbar h-100" id="chatContactsList">
              <ul
                className="contacts-list"
                id="chatContactTab"
                ref={trackScrollPosition}
              >
                <div ref={sentryPrevRef}></div>
                {contactStore.hasPrev && (
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                    `}
                  >
                    <PuffLoader color="#3498db" size={50} />
                  </div>
                )}

                {ContactsData.map((contact: Conversation, index: number) => {
                  if (!contact) return null;

                  const lastMessage: Message = contact.getLastMessage();
                  const online: boolean = false;
                  const school: any = schoolsStore.getById(contact.schoolId);

                  return (
                    <Link
                      id={`contacts_item_${contact.id}`}
                      to={`/chat?im=${contact.id}`}
                      key={`contacts_item_${contact.id}`}
                    >
                      <ContactItem
                        isIAm={
                          lastMessage &&
                          !lastMessage.income &&
                          lastMessage.user &&
                          lastMessage.user.id === usersStore.user?.id
                        }
                        isManager={lastMessage && !lastMessage.income}
                        index={index}
                        lastMessage={lastMessage}
                        contact={contact}
                        online={online}
                        active={
                          contactStore.activeContact &&
                          contactStore.activeContact.id === contact.id
                        }
                        selectContact={selectContact}
                        school={school}
                        setUnreadChat={setUnreadChat}
                      />
                    </Link>
                  );
                })}

                {contactStore.hasNext && (
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                    `}
                  >
                    <PuffLoader color="#3498db" size={50} />
                  </div>
                )}
                <div ref={sentryNextRef}></div>

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
