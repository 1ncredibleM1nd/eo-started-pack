import { useMediaQuery } from "react-responsive";
import { Conversation } from "@/entities";
import { useStore } from "@/stores";
import { observer } from "mobx-react-lite";
import { useHistory } from "react-router";
import { ConversationItem } from "../contacts/comp/Conversation";
import { SearchResultCount } from "./SearchResultCount";
import { SearchResultLoadMore } from "./SearchResultLoadMore";

export const SearchResultConversations = observer(() => {
  const history = useHistory();
  const sidebarOpenedByDefault = useMediaQuery({ minWidth: 1024 });
  const { searchStore, schoolsStore, contactStore, sidebarStore, appStore } =
    useStore();

  const { searchBySourceAccountQuery } = searchStore;

  const onSelect = (conversation: Conversation) => {
    history.replace(`chat?im=${conversation.id}`);
    contactStore.setActiveContact(conversation, true);
    appStore.setLayout("chat");
    sidebarStore.setOpened(sidebarOpenedByDefault);
  };

  const onLoadMore = () => {
    searchBySourceAccountQuery.loadNext();
  };

  const renderResult = searchBySourceAccountQuery?.items.map(
    (conversation: Conversation, index: number) => {
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
              lastMessage.user.id === conversation.user?.id
            }
            isManager={lastMessage && !lastMessage.income}
            index={index}
            lastMessage={lastMessage}
            contact={conversation}
            online={false}
            active={contactStore.activeContact?.hover(conversation.id)}
            selectContact={onSelect}
            school={schoolsStore.getById(conversation.schoolId)}
            setUnreadChat={() => {}}
          />
        </div>
      );
    }
  );

  return (
    <>
      <SearchResultCount
        count={searchBySourceAccountQuery.count}
        section={"именах"}
      />

      {renderResult}

      {searchBySourceAccountQuery.hasNext && (
        <SearchResultLoadMore
          onClick={onLoadMore}
          loading={searchBySourceAccountQuery.isPending}
        />
      )}
    </>
  );
});
