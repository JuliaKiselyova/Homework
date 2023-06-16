import { MenuApi } from '../../api/MenuApi';

export const FETCH_MENU_ITEMS = 'FETCH_MENU_ITEMS';
export const ADD_MENU_ITEM = 'ADD_MENU_ITEM';
export const UPDATE_MENU_ITEM = 'UPDATE_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';
export const FILTER_MENU_BY_CATEGORY = 'FILTER_MENU_BY_CATEGORY';

export const fetchMenuItems = () => {
    return (dispatch) => {
        return MenuApi.getList()
            .then((menuItems) => {
                dispatch({
                    type: FETCH_MENU_ITEMS,
                    payload: menuItems,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const addMenuItem = (menuItem) => {
    return (dispatch) => {
        return MenuApi.create(menuItem)
            .then((newMenuItem) => {
                dispatch({
                    type: ADD_MENU_ITEM,
                    payload: newMenuItem,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const updateMenuItem = (id, changes) => {
    return (dispatch) => {
        return MenuApi.update(id, changes)
            .then((updatedMenuItem) => {
                dispatch({
                    type: UPDATE_MENU_ITEM,
                    payload: { id, changes: updatedMenuItem },
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const deleteMenuItem = (id) => {
    return (dispatch) => {
        return MenuApi.delete(id)
            .then(() => {
                dispatch({
                    type: DELETE_MENU_ITEM,
                    payload: id,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
};

export const fetchMenu = () => {
    return (dispatch) => {
        dispatch(fetchMenuItems());
    };
};

export const filterMenuByCategory = (category) => {
    return {
        type: FILTER_MENU_BY_CATEGORY,
        payload: category,
    };
};
