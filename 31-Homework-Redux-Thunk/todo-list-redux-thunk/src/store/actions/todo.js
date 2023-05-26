import ToDoApi from '../../Api/ToDoApi';

export const ACTION_TODO_CREATE = 'ACTION_TODO_CREATE';
export const ACTION_TODO_REMOVE = 'ACTION_TODO_REMOVE';
export const ACTION_TODO_EDIT = 'ACTION_TODO_EDIT';
export const ACTION_TODO_SET_FILTER = 'ACTION_TODO_SET_FILTER';
export const ACTION_TODO_FETCH = 'ACTION_TODO_FETCH';



export function addTodo(todo) {
    return (dispatch) => {
        ToDoApi.createTodoItem(todo)
            .then((createdTodo) => {
                dispatch({ type: ACTION_TODO_CREATE, payload: createdTodo });
            })
            .catch((error) => {
                console.error('Failed to add todo:', error);
            });
    };
}

export function deleteTodoItem(id) {
    return (dispatch) => {
        ToDoApi.deleteItem(id)
            .then(() => {
                dispatch({ type: ACTION_TODO_REMOVE, payload: id });
            })
            .catch((error) => {
                console.error('Failed to delete todo:', error);
            });
    };
}

export function updateTodoItem(id, changes) {
    return (dispatch) => {
        ToDoApi.updateTodoItem(id, changes)
            .then(() => {
                dispatch({ type: ACTION_TODO_EDIT, payload: { id, changes } });
            })
            .catch((error) => {
                console.error('Failed to update todo:', error);
            });
    };
}

export function setFilter(filter) {
    return { type: ACTION_TODO_SET_FILTER, payload: filter };
}

export function fetchTodoList() {
    return (dispatch) => {
        ToDoApi.getTodoList()
            .then((todoList) => {
                dispatch({ type: ACTION_TODO_FETCH, payload: todoList });
            })
            .catch((error) => {
                console.error('Failed to fetch todo list:', error);
            });
    };
}
