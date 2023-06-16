import TableApi from '../../api/TableApi';


export const FETCH_TABLES = 'FETCH_TABLES';
export const ADD_TABLE = 'ADD_TABLE';
export const UPDATE_TABLE = 'UPDATE_TABLE';
export const DELETE_TABLE = 'DELETE_TABLE';
export const FILTER_TABLES = 'FILTER_TABLES';



export const fetchTables = () => {
    return (dispatch) => {
        return TableApi.getList()
            .then((tables) => {
                dispatch({
                    type: FETCH_TABLES,
                    payload: tables,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const addTable = (table) => {
    return (dispatch) => {
        return TableApi.create(table)
            .then((newTable) => {
                dispatch({
                    type: ADD_TABLE,
                    payload: newTable,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const updateTable = (id, changes) => {
    return (dispatch) => {
        return TableApi.update(id, changes)
            .then((updatedTable) => {
                dispatch({
                    type: UPDATE_TABLE,
                    payload: updatedTable,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const deleteTable = (id) => {
    return (dispatch) => {
        return TableApi.delete(id)
            .then(() => {
                dispatch({
                    type: DELETE_TABLE,
                    payload: id,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const filterTables = (name) => {
    return {
        type: FILTER_TABLES,
        payload: name,
    };
};
