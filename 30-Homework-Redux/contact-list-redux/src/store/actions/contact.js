export const ACTION_CONTACT_CREATE = 'ACTION_CONTACT_CREATE';
export const ACTION_CONTACT_REMOVE = 'ACTION_CONTACT_REMOVE';
export const ACTION_CONTACT_UPDATE = 'ACTION_CONTACT_UPDATE';

export function createContact(newContact) {
    return {
        type: ACTION_CONTACT_CREATE,
        payload: newContact,
    };
}

export function deleteContact(id) {
    return {
        type: ACTION_CONTACT_REMOVE,
        payload: id,
    };
}

export function updateContact(updatedContact) {
    return {
        type: ACTION_CONTACT_UPDATE,
        payload: updatedContact,
    };
}