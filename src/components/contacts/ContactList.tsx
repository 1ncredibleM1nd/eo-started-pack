import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import HashLoader from "react-spinners/HashLoader";
import "./ContactList.scss";
import "./Contact.scss";
import { Conversation, Message } from "@/entities";
import ContactItem from "./comp/ContactItem";
import { useStore } from "@/stores";
import { css } from "goober";
import { useHistory } from "react-router-dom";
import { setUnreadChat } from "@/actions";
import { useInView } from "react-intersection-observer";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import { PuffLoader } from "react-spinners";

const ContactList = observer(() => {
  const { contactStore, appStore, schoolsStore, usersStore, sidebarStore } =
    useStore();
  const query = useLocationQuery();
  const history = useHistory();
  const ContactsData = contactStore.sortedConversations;
  const filterSwitch = contactStore.filterSwitch;

  const { ref: sentryPrevRef, inView: isVisiblePrev } = useInView({
    initialInView: true,
  });
  const { ref: sentryNextRef, inView: isVisibleNext } = useInView({
    threshold: 0.85,
  });

  const trackScrollPosition = useCallback((node) => {
    const id = query.get("im");
    if (node && id) {
      setTimeout(() => {
        document.getElementById(`contacts_item_${id}`)?.scrollIntoView({
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
    history.replace(`chat?im=${id}`);
    contactStore.setActiveContact(id);
    appStore.setLayout("chat");
    sidebarStore.show();
  };

  if (!contactStore.isLoaded) {
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
          <ul
            className="contacts-list"
            id="chatContactTab"
            ref={trackScrollPosition}
          >
            <div ref={sentryPrevRef}>
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
            </div>

            {ContactsData.map((contact: Conversation, index: number) => {
              if (!contact) return null;

              const lastMessage: Message = contact.lastMessage;
              const online: boolean = false;
              const school: any = schoolsStore.getById(contact.schoolId);

              return (
                <div
                  id={`contacts_item_${contact.id}`}
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
                </div>
              );
            })}

            <div ref={sentryNextRef}>
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
            </div>

            {ContactsData && !ContactsData.length && (
              <li className={`contacts-item friends`}>
                <div className="announcement">Контактов нет ¯\_(ツ)_/¯</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
});

export default ContactList;
