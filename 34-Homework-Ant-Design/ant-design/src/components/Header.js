import React from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../store/actions/contact';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

const initialValues = {
    firstName: '',
    lastName: '',
    phone: ''
};

const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string()
        .required('Phone is required')
        .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Phone number must be in the format (XXX) XXX-XXXX'),
});

function Header() {
    const dispatch = useDispatch();

    const handleSubmit = (values, { resetForm }) => {
        dispatch(addContact(values));
        resetForm();
    };

    return (
        <header>
            <h1>Contact List</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <Field
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                    />
                    <ErrorMessage name="firstName" component="div" />

                    <Field
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                    />
                    <ErrorMessage name="lastName" component="div" />

                    <Field name="phone">
                        {({ field }) => (
                            <InputMask
                                {...field}
                                mask="(999) 999-9999"
                                maskPlaceholder=""
                                placeholder="Phone"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="phone" component="div" />

                    <button type="submit">Add Contact</button>
                </Form>
            </Formik>
        </header>
    );
}

export default Header;
