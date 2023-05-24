export const ACTION_TODO_CREATE = 'ACTION_TODO_CREATE';
export const ACTION_TODO_REMOVE = 'ACTION_TODO_REMOVE';
export const ACTION_TODO_EDIT = 'ACTION_TODO_EDIT';
export const ACTION_TODO_SET_FILTER = 'ACTION_TODO_SET_FILTER';

export function addTodo(todo) {
    return { type: ACTION_TODO_CREATE, payload: todo };
}

export function deleteTodo(id) {
    return { type: ACTION_TODO_REMOVE, payload: id };
}

export function updateTodo(id, updatedValue) {
    return { type: ACTION_TODO_EDIT, payload: { id, updatedValue } };
}

export function setFilter(filter) {
    return { type: ACTION_TODO_SET_FILTER, payload: filter };
}