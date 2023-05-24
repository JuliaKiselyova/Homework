import { ACTION_COUNTER_INCREMENT, ACTION_COUNTER_DECREMENT } from '../actions/counter';

const initialState = { count: 0 };

export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_COUNTER_INCREMENT:
            return { ...state, count: state.count + 1 };
        case ACTION_COUNTER_DECREMENT:
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
}