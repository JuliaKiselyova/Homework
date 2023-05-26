import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ContactList from './components/ContactList';
import Footer from './components/Footer';
import { getContacts, addContact, deleteContact, updateContact } from './store/actions/contact';
import './App.css';
function App() {
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contact.contactList);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleCreateContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleUpdateContact = (id, updatedContact) => {
    dispatch(updateContact(id, updatedContact));
  };

  return (
    <div>
      <Header onCreateContact={handleCreateContact} />
      <ContactList
        contactList={contactList}
        onDeleteContact={handleDeleteContact}
        onUpdateContact={handleUpdateContact}
      />
      <Footer />
    </div>
  );
}

export default App;
