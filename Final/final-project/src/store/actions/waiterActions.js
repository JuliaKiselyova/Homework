import { WaiterApi } from '../../api/WaiterApi';

export const FETCH_WAITERS = 'FETCH_WAITERS';
export const ADD_WAITER = 'ADD_WAITER';
export const UPDATE_WAITER = 'UPDATE_WAITER';
export const DELETE_WAITER = 'DELETE_WAITER';
export const SET_WAITER_FILTER = 'SET_WAITER_FILTER';

export const fetchWaiters = () => {
    return (dispatch) => {
        return WaiterApi.getList()
            .then((waiters) => {
                dispatch({
                    type: FETCH_WAITERS,
                    payload: waiters,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const addWaiter = (waiter) => {
    return (dispatch) => {
        return WaiterApi.create(waiter)
            .then((newWaiter) => {
                dispatch({
                    type: ADD_WAITER,
                    payload: newWaiter,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const updateWaiter = (id, changes) => {
    return (dispatch) => {
        return WaiterApi.update(id, changes)
            .then((updatedWaiter) => {
                dispatch({
                    type: UPDATE_WAITER,
                    payload: updatedWaiter,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const deleteWaiter = (id) => {
    return (dispatch) => {
        return WaiterApi.delete(id)
            .then(() => {
                dispatch({
                    type: DELETE_WAITER,
                    payload: id,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};


export const setWaiterFilter = (filter) => ({
    type: SET_WAITER_FILTER,
    payload: filter,
});

