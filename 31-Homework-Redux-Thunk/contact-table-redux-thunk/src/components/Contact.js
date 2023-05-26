import React, { useState } from 'react';

function Contact(props) {
    const { contact, onDeleteContact, onUpdateContact } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(contact);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData(contact);
    };

    const handleSaveEdit = () => {
        onUpdateContact(contact.id, formData);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDeleteContact(contact.id);
    };

    return (
        <tr>
            {!isEditing ? (
                <>
                    <td>{contact.firstName}</td>
                    <td>{contact.lastName}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <button onClick={handleToggleEdit} className="edit-btn">
                            Edit
                        </button>
                        <button onClick={handleDelete} className="delete-btn">
                            Delete
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </td>
                    <td>
                        <button onClick={handleSaveEdit} className="save-btn">
                            Save
                        </button>
                        <button onClick={handleCancelEdit} className="cancel-btn">
                            Cancel
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Contact;
