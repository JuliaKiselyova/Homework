import React from 'react';
import Contact from './Contact';


function ContactList(props) {
    const { contactList } = props;

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
                {contactList.map((contact) => (
                    <Contact
                        key={contact.id}
                        contact={contact}
                    />
                ))}
            </tbody>
        </table>
    );
}

export default ContactList;
