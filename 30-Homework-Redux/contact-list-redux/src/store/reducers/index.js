import { combineReducers } from 'redux';
import counterReducer from './counterReducers';
import contactReducer from './contactReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    contact: contactReducer
});

export default rootReducer;
