import { observer } from "mobx-react-lite";
import Search from "@/components/contacts/Search";
import PuffLoader from "react-spinners/PuffLoader";
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
          <PuffLoader color="#3498db" size={50} />
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
