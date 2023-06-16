import { OrderApi } from '../../api/OrderApi';

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const ADD_ORDER = 'ADD_ORDER';
export const UPDATE_ORDER = 'UPDATE_ORDER';
export const DELETE_ORDER = 'DELETE_ORDER';

export const fetchOrders = () => {
    return (dispatch) => {
        return OrderApi.getList()
            .then((orders) => {
                dispatch({
                    type: FETCH_ORDERS,
                    payload: orders,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const addOrder = (order) => {
    return (dispatch) => {
        return OrderApi.create(order)
            .then((newOrder) => {
                dispatch({
                    type: ADD_ORDER,
                    payload: newOrder,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const updateOrder = (id, changes) => {
    return (dispatch) => {
        return OrderApi.update(id, changes)
            .then((updatedOrder) => {
                dispatch({
                    type: UPDATE_ORDER,
                    payload: updatedOrder,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const deleteOrder = (id) => {
    return (dispatch) => {
        return OrderApi.delete(id)
            .then(() => {
                dispatch({
                    type: DELETE_ORDER,
                    payload: id,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};
