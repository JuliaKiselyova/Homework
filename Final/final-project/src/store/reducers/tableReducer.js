
import { FETCH_TABLES, ADD_TABLE, UPDATE_TABLE, DELETE_TABLE } from '../actions/tableActions';

const initialState = {
    list: [],
};


const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TABLES:
            return {
                ...state,
                list: action.payload,
            };
        case ADD_TABLE:
            return {
                ...state,
                list: [...state.list, action.payload],
            };
        case UPDATE_TABLE:
            return {
                ...state,
                list: state.list.map((table) => {
                    if (table.id === action.payload.id) {
                        return { ...table, ...action.payload };
                    }
                    return table;
                }),
            };
        case DELETE_TABLE:
            return {
                ...state,
                list: state.list.filter((table) => table.id !== action.payload),
            };
        default:
            return state;
    }
};

export default tableReducer;
