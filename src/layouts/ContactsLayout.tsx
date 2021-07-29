import React from "react";
import { observer } from "mobx-react-lite";
import Search from "@/components/contacts/Search";
import ContactList from "@/components/contacts/ContactList";

const ContactLayout = observer(() => {
  return (
    <div className="contact_layout">
      <Search />
      <ContactList />
    </div>
  );
});

export default ContactLayout;
