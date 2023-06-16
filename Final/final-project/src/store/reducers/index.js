import { combineReducers } from 'redux';
import tableReducer from './tableReducer';
import orderReducer from './orderReducer';
import waiterReducer from './waiterReducer';
import menuReducer from './menuReducer';

const rootReducer = combineReducers({
    menu: menuReducer,
    tables: tableReducer,
    order: orderReducer,
    waiter: waiterReducer,

});

export default rootReducer;
