import React, { useState } from 'react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

function Contact(props) {
    const { contact, onDeleteContact, onUpdateContact } = props;
    const [isEditing, setIsEditing] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            phone: Yup.string()
                .required('Phone number is required')
                .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone number must be in the format (XXX) XXX-XXXX'),
        }),
        onSubmit: (values) => {
            onUpdateContact(contact.id, values);
            formik.setSubmitting(false);
            formik.resetForm();
            setIsEditing(false);
        },
    });

    const handleDelete = () => {
        onDeleteContact(contact.id);
    };

    const handleToggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        formik.setFieldValue(name, value);
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
                            value={formik.values.firstName}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}
                    </td>
                    <td>
                        <input
                            type="text"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}
                    </td>
                    <td>
                        <InputMask
                            mask="(999) 999-9999"
                            maskPlaceholder=""
                            name="phone"
                            value={formik.values.phone}
                            onChange={handleInputChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div>{formik.errors.phone}</div>
                        ) : null}
                    </td>
                    <td>
                        <button onClick={formik.handleSubmit} className="save-btn">
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
