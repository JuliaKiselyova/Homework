import React, { useState } from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';

function ContactList(props) {
    const { contactList, onDeleteContact, onUpdateContact } = props;
    const [editingContactId, setEditingContactId] = useState(null);
    const [searchText, setSearchText] = useState('');

    const handleDeleteContact = (contactId) => {
        onDeleteContact(contactId);
    };

    const handleEditContact = (contactId) => {
        setEditingContactId(contactId);
    };

    const handleCancelEdit = () => {
        setEditingContactId(null);
    };

    const handleUpdateContact = (contactId, updatedContact) => {
        onUpdateContact(contactId, updatedContact);
        setEditingContactId(null);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredContacts = contactList.filter(
        (contact) =>
            contact.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
            contact.phone.includes(searchText)
    );

    const columns = [
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            sorter: true,
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            sorter: true,
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            sorter: true,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <>
                    <Button type="primary" onClick={() => handleEditContact(record.id)}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure you want to delete this contact?"
                        onConfirm={() => handleDeleteContact(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="danger" style={{ marginLeft: '8px' }}>
                            Delete
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div>
            <Input.Search
                placeholder="Search"
                onChange={handleSearch}
                style={{ marginBottom: '16px' }}
            />
            <Table
                dataSource={filteredContacts}
                columns={columns}
                rowKey="id"
                expandedRowRender={(record) =>
                    record.id === editingContactId ? (
                        <tr>
                            <td colSpan="4">
                                <EditContactForm
                                    contact={record}
                                    onUpdateContact={handleUpdateContact}
                                    onCancelEdit={handleCancelEdit}
                                />
                            </td>
                        </tr>
                    ) : null
                }
                expandRowByClick
            />
        </div>
    );
}

function EditContactForm(props) {
    const { contact, onUpdateContact, onCancelEdit } = props;

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
            formik.resetForm();
        },
    });

    return (
        <tr>
            <td colSpan="4">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label>First Name:</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.firstName && formik.errors.firstName ? (
                            <div>{formik.errors.firstName}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Last Name:</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div>{formik.errors.lastName}</div>
                        ) : null}
                    </div>
                    <div>
                        <label>Phone:</label>
                        <InputMask
                            mask="(999) 999-9999"
                            maskPlaceholder=""
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div>{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div>
                        <button type="submit" className="save-btn">
                            Save
                        </button>
                        <button type="button" onClick={onCancelEdit} className="cancel-btn">
                            Cancel
                        </button>
                    </div>
                </form>
            </td>
        </tr>
    );
}

export default ContactList;
