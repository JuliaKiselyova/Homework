import { ACTION_CONTACT_CREATE, ACTION_CONTACT_REMOVE, ACTION_CONTACT_UPDATE } from '../actions/contact';

const initialState = {
    contactList: [
        { id: '1', firstName: 'Harry', lastName: 'Potter', phone: '222222' },
        { id: '2', firstName: 'Tom', lastName: 'Riddle', phone: '111111' },
        { id: '3', firstName: 'Johnny', lastName: 'Depp', phone: '12345673' },
    ],
};

export default function contactReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_CONTACT_CREATE:
            return {
                ...state,
                contactList: [...state.contactList, { ...action.payload, id: Math.random().toString() }],
            };
        case ACTION_CONTACT_REMOVE:
            return {
                ...state,
                contactList: state.contactList.filter((contact) => contact.id !== action.payload),
            };
        case ACTION_CONTACT_UPDATE:
            return {
                ...state,
                contactList: state.contactList.map((contact) =>
                    contact.id === action.payload.id ? { ...action.payload } : contact
                ),
            };
        default:
            return state;
    }
}