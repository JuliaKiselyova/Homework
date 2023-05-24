const initialState = {
    contactList: [
        { id: '1', firstName: 'Harry', lastName: 'Potter', phone: '222222' },
        { id: '2', firstName: 'Tom', lastName: 'Riddle', phone: '111111' },
        { id: '3', firstName: 'Johnny', lastName: 'Depp', phone: '12345673' },
    ],
};

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_CONTACT':
            return {
                ...state,
                contactList: [...state.contactList, { ...action.payload, id: Math.random().toString() }],
            };
        case 'DELETE_CONTACT':
            return {
                ...state,
                contactList: state.contactList.filter((contact) => contact.id !== action.payload),
            };
        case 'UPDATE_CONTACT':
            return {
                ...state,
                contactList: state.contactList.map((contact) =>
                    contact.id === action.payload.id ? { ...action.payload } : contact
                ),
            };
        default:
            return state;
    }
};

export default contactReducer
