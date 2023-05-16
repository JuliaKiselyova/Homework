import React, { useState } from 'react';

function Contact(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({ firstName: props.firstName, lastName: props.lastName, phone: props.phone });
    };

    const handleSaveEdit = () => {
        props.onUpdateContact({ ...formData, id: props.id });
        setIsEditing(false);
    };

    const handleDelete = () => {
        props.onDeleteContact(props.id);
    };

    return (
        <tr>
            {!isEditing ? (
                <>
                    <td>{props.firstName}</td>
                    <td>{props.lastName}</td>
                    <td>{props.phone}</td>
                    <td>
                        <button onClick={handleToggleEdit} className="edit-btn">Edit</button>
                        <button onClick={handleDelete} className="delete-btn">Delete</button>
                    </td>
                </>
            ) : (
                <>
                    <td>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </td>
                    <td>
                        <button onClick={handleSaveEdit} className="save-btn">Save</button>
                        <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Contact;
