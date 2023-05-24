export const ACTION_TODO_CREATE = 'ACTION_TODO_CREATE';
export const ACTION_TODO_REMOVE = 'ACTION_TODO_REMOVE';
export const ACTION_TODO_EDIT = 'ACTION_TODO_EDIT';

export function createContact(newContact) {
    return {
        type: ACTION_TODO_CREATE,
        payload: newContact,
    };
}

export function deleteContact(id) {
    return {
        type: ACTION_TODO_REMOVE,
        payload: id,
    };
}

export function updateContact(updatedContact) {
    return {
        type: ACTION_TODO_EDIT,
        payload: updatedContact,
    };
}
