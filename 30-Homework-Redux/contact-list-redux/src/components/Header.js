import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../store/actions/contact';

function Header() {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '' });
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createContact(formData));
        setFormData({ firstName: '', lastName: '', phone: '' });
    };

    return (
        <header>
            <h1>Contact Table</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </label>
                <label>
                    Phone:
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </label>
                <button type="submit">Add Contact</button>
            </form>
        </header>
    );
}

export default Header;
