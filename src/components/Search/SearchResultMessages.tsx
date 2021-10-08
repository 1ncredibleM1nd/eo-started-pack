import { Conversation } from "@/entities";
import { useMediaQuery } from "react-responsive";
import { useStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router-dom";
import { ConversationItem } from "../contacts/comp/Conversation";
import { SearchResultCount } from "./SearchResultCount";
import { SearchResultLoadMore } from "./SearchResultLoadMore";

export const SearchResultMessages = observer(() => {
  const history = useHistory();
  const sidebarOpenedByDefault = useMediaQuery({ minWidth: 1024 });
  const { searchStore, schoolsStore, contactStore, sidebarStore, appStore } =
    useStore();

  const { searchByMessageQuery } = searchStore;

  const onSelect = (conversation: Conversation) => {
    history.replace(`chat?im=${conversation.id}`);
    contactStore.setActiveContact(conversation, true);
    appStore.setLayout("chat");
    sidebarStore.setOpened(sidebarOpenedByDefault);
  };

  const onLoadMore = () => {
    searchByMessageQuery.loadNext();
  };

  const renderResult = searchByMessageQuery?.items.map(
    (conversation: Conversation, index: number) => {
      if (!conversation) return null;

      const lastMessage = conversation.lastMessage;
      return (
        <div id={`contacts_item_${index}`} key={`contacts_item_${index}`}>
          <ConversationItem
            isIAm={
              lastMessage &&
              !lastMessage.income &&
              lastMessage.user &&
              lastMessage.user.id === conversation.user?.id
            }
            isManager={lastMessage && !lastMessage.income}
            index={index}
            lastMessage={lastMessage}
            contact={conversation}
            online={false}
            active={contactStore.activeContact?.hover(lastMessage.id)}
            selectContact={onSelect}
            school={schoolsStore.getById(conversation.schoolId)}
          />
        </div>
      );
    }
  );

  return (
    <>
      <SearchResultCount
        count={searchByMessageQuery.count}
        section={"сообщениях"}
      />

      {renderResult}

      {searchByMessageQuery.hasNext && (
        <SearchResultLoadMore
          onClick={onLoadMore}
          loading={searchByMessageQuery.isPending}
        />
      )}
    </>
  );
});
