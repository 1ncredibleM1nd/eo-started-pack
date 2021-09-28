import { observer } from "mobx-react-lite";
import Search from "@/components/contacts/Search";
import HashLoader from "react-spinners/HashLoader";
import ContactList from "@/components/contacts/ContactList";
import { useStore } from "@/stores";
import { SearchResult } from "@/components/Search/SearchResult";

const ContactLayout = observer(() => {
  const { searchStore, contactStore } = useStore();
  const isLoading = !contactStore.isLoaded || !searchStore.isLoaded;

  return (
    <div className="contact_layout">
      <Search />
      {isLoading ? (
        <div className="loading">
          <HashLoader color="#3498db" size={50} />
        </div>
      ) : searchStore.running ? (
        <SearchResult />
      ) : (
        <ContactList />
      )}
    </div>
  );
});

export default ContactLayout;
