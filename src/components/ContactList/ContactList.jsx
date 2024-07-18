import { deleteContact, fetchContact } from "../../redux/contactsOps";
import { getContacts, getFilters, selectError, selectIsLoading } from "../../redux/selectors";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";

const ContactList = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts) || [];
  const filters = useSelector(getFilters) || "";
const isLoading = useSelector(selectIsLoading);
const error = useSelector(selectError);
const visibleContacts = useSelector(selectFilteredContacts);



  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);

  const getVisibleContacts =
    contacts && Array.isArray(contacts)
      ? contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filters.toLowerCase())
        )
      : [];

  const handleDeleteContact = (contactId) => {
    dispatch(deleteContact(contactId));
  };

if (isLoading) {
  return <p>Loading, please wait...</p>;
}

if (error) {
  return <p>Error: {error}</p>;
}

if (!contacts || contacts.length === 0) {
  return <p>No contacts found...</p>;
}




  return (
    <div>
      <ul className={css.list}>
        {getVisibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact
              data={contact}
              name={contact.name}
              number={contact.number}
              onDelete={() => handleDeleteContact(contact.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
