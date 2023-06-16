export class WaiterApi {
    static API = 'https://mock-api-5678.nw.r.appspot.com/waiters/';

    static request(url = '', method = 'GET', body) {
        return fetch(WaiterApi.API + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Cannot execute server request.');
            });
    }

    static getList() {
        return WaiterApi.request().catch(() => {
            throw new Error('Cannot retrieve waiter list from server.');
        });
    }

    static getOne(id) {
        return WaiterApi.request(id).catch(() => {
            throw new Error('Cannot retrieve one waiter from server.');
        });
    }

    static create(waiter) {
        return WaiterApi.request('', 'POST', waiter).catch(() => {
            throw new Error('Cannot create waiter on server.');
        });
    }

    static update(id, changes) {
        return WaiterApi.request(id, 'PUT', changes).catch(() => {
            throw new Error('Cannot update waiter on server.');
        });
    }

    static delete(id) {
        return WaiterApi.request(id, 'DELETE').catch(() => {
            throw new Error('Cannot delete waiter on server.');
        });
    }
}
