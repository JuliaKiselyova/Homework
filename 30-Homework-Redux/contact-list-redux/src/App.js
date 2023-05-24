import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import ContactList from './components/ContactList';
import Footer from './components/Footer';
import './App.css';
import { createContact, deleteContact, updateContact } from './store/actions/contact';

function App() {
  const dispatch = useDispatch();
  const contactList = useSelector((state) => state.contact.contactList);

  const handleCreateContact = (newContact) => {
    dispatch(createContact(newContact));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleUpdateContact = (updatedContact) => {
    dispatch(updateContact(updatedContact));
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
