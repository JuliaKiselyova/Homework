import React from 'react';
import Contact from './Contact';

function ContactList(props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.contactList.map((contact) => (
                    <Contact
                        key={contact.id}
                        id={contact.id}
                        firstName={contact.firstName}
                        lastName={contact.lastName}
                        phone={contact.phone}
                        onDeleteContact={props.onDeleteContact}
                        onUpdateContact={props.onUpdateContact}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ContactList;
