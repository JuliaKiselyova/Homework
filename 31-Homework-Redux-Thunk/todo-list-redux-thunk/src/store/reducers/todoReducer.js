import {
    ACTION_TODO_CREATE,
    ACTION_TODO_REMOVE,
    ACTION_TODO_EDIT,
    ACTION_TODO_SET_FILTER,
} from '../actions/todo';

const initialState = {
    list: [],
    filter: 'all',
};

export default function todoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTION_TODO_CREATE:
            return {
                ...state,
                list: [...state.list, payload],
            };

        case ACTION_TODO_REMOVE:
            return {
                ...state,
                list: state.list.filter((todo) => todo.id !== payload),
            };

        case ACTION_TODO_EDIT:
            return {
                ...state,
                list: state.list.map((todo) => {
                    if (todo.id === payload.id) {
                        return {
                            ...todo,
                            ...payload.changes,
                        };
                    }
                    return todo;
                }),
            };

        case ACTION_TODO_SET_FILTER:
            return {
                ...state,
                filter: payload,
            };

        default:
            return state;
    }
}
