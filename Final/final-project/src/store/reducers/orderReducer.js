// src/store/reducers/orderReducer.js
import { FETCH_ORDERS, ADD_ORDER, UPDATE_ORDER, DELETE_ORDER } from '../actions/orderActions';

const initialState = {
    list: [],
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ORDERS:
            return {
                ...state,
                list: action.payload,
            };

        case ADD_ORDER:
            return {
                ...state,
                list: [...state.list, action.payload],
            };

        case UPDATE_ORDER:
            return {
                ...state,
                list: state.list.map((order) =>
                    order.id === action.payload.id ? action.payload : order
                ),
            };

        case DELETE_ORDER:
            return {
                ...state,
                list: state.list.filter((order) => order.id !== action.payload),
            };

        default:
            return state;
    }
};

export default orderReducer;
