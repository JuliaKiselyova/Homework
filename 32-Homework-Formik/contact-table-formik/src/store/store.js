import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
    contact: contactReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
