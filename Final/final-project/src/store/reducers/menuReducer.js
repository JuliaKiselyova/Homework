import {
    FETCH_MENU_ITEMS,
    ADD_MENU_ITEM,
    UPDATE_MENU_ITEM,
    DELETE_MENU_ITEM,
    FILTER_MENU_BY_CATEGORY,
} from '../actions/menuActions';

const initialState = {
    menuItems: [],
    filteredMenuItems: [],
};

const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MENU_ITEMS:
            return {
                ...state,
                menuItems: action.payload,
                filteredMenuItems: action.payload,
            };
        case ADD_MENU_ITEM:
            return {
                ...state,
                menuItems: [...state.menuItems, action.payload],
                filteredMenuItems: [...state.menuItems, action.payload],
            };
        case UPDATE_MENU_ITEM:
            return {
                ...state,
                menuItems: state.menuItems.map((menuItem) =>
                    menuItem.id === action.payload.id
                        ? { ...menuItem, ...action.payload.changes }
                        : menuItem
                ),
                filteredMenuItems: state.filteredMenuItems.map((menuItem) =>
                    menuItem.id === action.payload.id
                        ? { ...menuItem, ...action.payload.changes }
                        : menuItem
                ),
            };
        case DELETE_MENU_ITEM:
            return {
                ...state,
                menuItems: state.menuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),
                filteredMenuItems: state.filteredMenuItems.filter(
                    (menuItem) => menuItem.id !== action.payload
                ),
            };
        case FILTER_MENU_BY_CATEGORY:
            const { category } = action.payload;
            const filteredMenuItems = category
                ? state.menuItems.filter((menuItem) => menuItem.category === category)
                : state.menuItems;
            return {
                ...state,
                filteredMenuItems,
            };
        default:
            return state;
    }
};

export default menuReducer;
