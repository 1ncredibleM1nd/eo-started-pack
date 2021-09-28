import { observer } from "mobx-react-lite";
import { SearchResultConversations } from "./SearchResultConversations";
import { SearchResultMessages } from "./SearchResultMessages";

export const SearchResult = observer(() => {
  return (
    <div className={"contacts-list"}>
      <SearchResultConversations />
      <SearchResultMessages />
    </div>
  );
});
