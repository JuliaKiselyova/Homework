import { FETCH_WAITERS, ADD_WAITER, UPDATE_WAITER, DELETE_WAITER, SET_WAITER_FILTER } from '../actions/waiterActions';

const initialState = {
    list: [],
    filter: '',
};

const waiterReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WAITERS:
            return { ...state, list: action.payload };
        case ADD_WAITER:
            return { ...state, list: [...state.list, action.payload] };
        case UPDATE_WAITER:
            const updatedList = state.list.map((waiter) =>
                waiter.id === action.payload.id ? action.payload : waiter
            );
            return { ...state, list: updatedList };
        case DELETE_WAITER:
            const filteredList = state.list.filter((waiter) => waiter.id !== action.payload);
            return { ...state, list: filteredList };
        case SET_WAITER_FILTER:
            return { ...state, filter: action.payload };
        default:
            return state;
    }
};

export default waiterReducer;
