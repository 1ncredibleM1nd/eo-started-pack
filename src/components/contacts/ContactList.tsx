import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./ContactList.scss";
import "./Contact.scss";
import { Conversation } from "@/entities";
import { ConversationItem } from "./comp/Conversation/ConversationItem";
import { useStore } from "@/stores";
import { useHistory } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useLocationQuery } from "@/hooks/useLocationQuery";
import { ContactListLoader } from "./ContactListLoader/ContactListLoader";
import { useMediaQuery } from "react-responsive";

const ContactList = observer(() => {
  const { contactStore, layoutStore, schoolsStore, usersStore, sidebarStore } =
    useStore();
  const query = useLocationQuery();
  const history = useHistory();
  const sidebarOpenedByDefault = useMediaQuery({ minWidth: 1024 });
  const { sortedConversations } = contactStore;

  const { ref: sentryPrevRef, inView: isVisiblePrev } = useInView({});
  const { ref: sentryNextRef, inView: isVisibleNext } = useInView({
    threshold: 0.85,
  });

  const trackScrollPosition = useCallback((node) => {
    const id = query.get("im");
    if (node && id) {
      document.getElementById(`contacts_item_${id}`)?.scrollIntoView({
        block: "start",
      });
    }
  }, []);

  const onSelect = (conversation: Conversation) => {
    history.replace(`chat?im=${conversation.id}`);
    layoutStore.setLayout("chat");
    contactStore.setActiveContact(conversation);
    sidebarStore.setOpened(sidebarOpenedByDefault);
  };

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

  return (
    <ul className="contacts-list" ref={trackScrollPosition}>
      <div ref={sentryPrevRef}>
        {contactStore.hasPrev && <ContactListLoader />}
      </div>

      {sortedConversations.map((conversation: Conversation, index: number) => {
        if (!conversation) return null;

        const lastMessage = conversation.lastMessage;
        return (
          <div
            id={`contacts_item_${conversation.id}`}
            key={`contacts_item_${conversation.id}`}
          >
            <ConversationItem
              isIAm={
                lastMessage &&
                !lastMessage.income &&
                lastMessage.user &&
                lastMessage.user.id === usersStore.user?.id
              }
              isManager={lastMessage && !lastMessage.income}
              index={index}
              lastMessage={lastMessage}
              contact={conversation}
              online={false}
              active={contactStore.activeContact?.hover(conversation.id)}
              selectContact={onSelect}
              school={schoolsStore.getById(conversation.schoolId)}
              onChangeStatus={(id, status) =>
                contactStore.setDialogStatusById(id, status)
              }
            />
          </div>
        );
      })}

      <div ref={sentryNextRef}>
        {contactStore.hasNext && <ContactListLoader />}
      </div>

      {sortedConversations && !sortedConversations.length && (
        <li className={`contacts-item friends`}>
          <div className="announcement">Контактов нет ¯\_(ツ)_/¯</div>
        </li>
      )}
    </ul>
  );
});

export default ContactList;
