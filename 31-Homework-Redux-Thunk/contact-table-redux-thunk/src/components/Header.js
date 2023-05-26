import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/actions/contact';

function Header() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '' });
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addContact(formData));
        setFormData({ firstName: '', lastName: '', phone: '' });
    };

    return (
        <header>
            <h1>Contact List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                />
                <button type="submit">Add Contact</button>
            </form>
        </header>
    );
}

export default Header;
