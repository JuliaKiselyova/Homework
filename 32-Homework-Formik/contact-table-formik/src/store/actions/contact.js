import ContactListApi from '../../Api/ContactListApi';

export const ACTION_CONTACTS_FETCH_SUCCESS = 'ACTION_CONTACTS_FETCH_SUCCESS';
export const ACTION_CONTACT_CREATE_SUCCESS = 'ACTION_CONTACT_CREATE_SUCCESS';
export const ACTION_CONTACT_UPDATE_SUCCESS = 'ACTION_CONTACT_UPDATE_SUCCESS';
export const ACTION_CONTACT_DELETE_SUCCESS = 'ACTION_CONTACT_DELETE_SUCCESS';

export const getContacts = () => {
    return (dispatch) => {
        return ContactListApi.getContacts()
            .then((contacts) => {
                dispatch({ type: ACTION_CONTACTS_FETCH_SUCCESS, payload: contacts });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const addContact = (contact) => {
    return (dispatch) => {
        return ContactListApi.addContact(contact)
            .then((newContact) => {
                dispatch({ type: ACTION_CONTACT_CREATE_SUCCESS, payload: newContact });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const updateContact = (id, contact) => {
    return (dispatch) => {
        return ContactListApi.updateContact(id, contact)
            .then((updatedContact) => {
                dispatch({ type: ACTION_CONTACT_UPDATE_SUCCESS, payload: updatedContact });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const deleteContact = (id) => {
    return (dispatch) => {
        return ContactListApi.deleteContact(id)
            .then(() => {
                dispatch({ type: ACTION_CONTACT_DELETE_SUCCESS, payload: id });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};
