import {
    ACTION_TODO_CREATE,
    ACTION_TODO_REMOVE,
    ACTION_TODO_EDIT,
    ACTION_TODO_SET_FILTER
} from '../actions/todo';


const initialState = {
    list: [
        { "title": "facere blanditiis illumvddv", "status": true, "done": false, "id": "96", "toDo": "" },
        { "title": "itaque eveniet rationevdvdsvds", "status": true, "done": true, "id": "98", "toDo": "" },
        { "title": "molestiae nemo minus", "status": true, "done": true, "id": "99", "toDo": "" },
    ],
    filter: 'all',
};

export default function todoReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ACTION_TODO_CREATE:
            return {
                ...state,
                list: [
                    ...state.list,
                    {
                        ...payload,
                        id: Math.random().toString(),
                    },
                ],
            };

        case ACTION_TODO_REMOVE:
            const newList = state.list.filter((todo) => todo.id !== payload);
            return {
                ...state,
                list: newList,
            };

        case ACTION_TODO_EDIT:
            const updatedList = state.list.map((todo) => {
                if (todo.id === payload.id) {
                    return {
                        ...todo,
                        ...payload.updatedValue,
                    };
                }
                return todo;
            });
            return {
                ...state,
                list: updatedList,
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
