import { OrderApi } from '../../api/OrderApi';
import TableApi from '../../api/TableApi';
import { WaiterApi } from '../../api/WaiterApi';
import { setOrderList } from './orderActions';
import { setTableList } from './tableActions';
import { setWaiterList } from './waiterActions';

export const fetchCommonData = () => {
    return (dispatch) => {
        Promise.all([
            OrderApi.getList(),
            TableApi.getList(),
            WaiterApi.getList(),
        ])
            .then(([orders, tables, waiters]) => {
                dispatch(setOrderList(orders));
                dispatch(setTableList(tables));
                dispatch(setWaiterList(waiters));
            })
    };
};
