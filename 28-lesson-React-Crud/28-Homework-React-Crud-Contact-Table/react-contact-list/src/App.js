import React, { useState } from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import './App.css';



const initialList = [
  { id: '1', firstName: 'Harry', lastName: 'Potter', phone: '222222' },
  { id: '2', firstName: 'Tom', lastName: 'Riddle', phone: '111111' },
  { id: '3', firstName: 'Johnny', lastName: 'Depp', phone: '12345673' },
];

function App() {
  const [contactList, setContactList] = useState(initialList);

  const handleCreateContact = (newContact) => {
    setContactList([...contactList, { ...newContact, id: Math.random().toString() }]);
  };

  const handleDeleteContact = (id) => {
    setContactList(contactList.filter((contact) => contact.id !== id));
  };

  const handleUpdateContact = (updatedContact) => {
    setContactList(
      contactList.map((contact) =>
        contact.id === updatedContact.id ? { ...updatedContact } : contact
      )
    );
  };

  return (
    <div>
      <Header onCreateContact={handleCreateContact} />
      <ContactList
        contactList={contactList}
        onDeleteContact={handleDeleteContact}
        onUpdateContact={handleUpdateContact}
      />
    </div>
  );
}

export default App;
