import {
    ACTION_CONTACTS_FETCH_SUCCESS,
    ACTION_CONTACT_CREATE_SUCCESS,
    ACTION_CONTACT_UPDATE_SUCCESS,
    ACTION_CONTACT_DELETE_SUCCESS,
} from '../actions/contact';

const initialState = {
    contactList: [],
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_CONTACTS_FETCH_SUCCESS:
            return {
                ...state,
                contactList: action.payload,
            };
        case ACTION_CONTACT_CREATE_SUCCESS:
            return {
                ...state,
                contactList: [...state.contactList, action.payload],
            };
        case ACTION_CONTACT_UPDATE_SUCCESS:
            return {
                ...state,
                contactList: state.contactList.map((contact) =>
                    contact.id === action.payload.id ? action.payload : contact
                ),
            };
        case ACTION_CONTACT_DELETE_SUCCESS:
            return {
                ...state,
                contactList: state.contactList.filter((contact) => contact.id !== action.payload),
            };
        default:
            return state;
    }
};

export default contactReducer;
