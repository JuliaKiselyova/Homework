import {
    ACTION_COUNTER_INCREMENT,
    ACTION_COUNTER_DECREMENT
} from '../actions/counter';

const initialState = { counts: 0 };

export default function counterReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_COUNTER_INCREMENT:
            return { ...state, counts: state.counts + 1 };
        case ACTION_COUNTER_DECREMENT:
            return { ...state, counts: state.counts - 1 };
        default:
            return state;
    }
}
