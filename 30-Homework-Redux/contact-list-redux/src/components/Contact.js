import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateContact, deleteContact } from '../store/actions/contact';

function Contact(props) {
    const { id, firstName, lastName, phone } = props.contact;
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ firstName, lastName, phone });
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({ firstName, lastName, phone });
    };

    const handleSaveEdit = () => {
        dispatch(updateContact({ ...formData, id }));
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteContact(id));
    };

    return (
        <tr>
            {!isEditing ? (
                <>
                    <td>{firstName}</td>
                    <td>{lastName}</td>
                    <td>{phone}</td>
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
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </td>
                    <td>
                        <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
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
