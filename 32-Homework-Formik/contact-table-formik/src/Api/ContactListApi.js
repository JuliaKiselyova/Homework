class ContactListApi {
    static API = 'https://6425d484556bad2a5b441782.mockapi.io/api/contact-table/';

    static request(url = '', method = 'GET', body) {
        return fetch(ContactListApi.API + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error('Cannot execute server request.');
        });
    }

    static getContacts() {
        return ContactListApi.request().catch(() => {
            throw new Error('Cannot retrieve contact list from the server.');
        });
    }

    static addContact(contact) {
        return ContactListApi.request('', 'POST', contact).catch(() => {
            throw new Error('Cannot create a new contact on the server.');
        });
    }

    static updateContact(id, contact) {
        return ContactListApi.request(`${id}`, 'PUT', contact).catch(() => {
            throw new Error('Cannot update the contact on the server.');
        });
    }

    static deleteContact(id) {
        return ContactListApi.request(`${id}`, 'DELETE').catch(() => {
            throw new Error('Cannot delete the contact from the server.');
        });
    }
}

export default ContactListApi;
