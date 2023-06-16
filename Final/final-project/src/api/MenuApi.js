export class MenuApi {
    static API = 'https://mock-api-5678.nw.r.appspot.com/dishes/';

    static request(url = '', method = 'GET', body) {
        return fetch(MenuApi.API + url, {
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
        return MenuApi.request().catch(() => {
            throw new Error('Cannot retrieve menu list from server.');
        });
    }

    static getOne(id) {
        return MenuApi.request(id).catch(() => {
            throw new Error('Cannot retrieve one menu item from server.');
        });
    }

    static create(menuItem) {
        return MenuApi.request('', 'POST', menuItem).catch(() => {
            throw new Error('Cannot create menu item on server.');
        });
    }

    static update(id, changes) {
        return MenuApi.request(id, 'PUT', changes).catch(() => {
            throw new Error('Cannot update menu item on server.');
        });
    }

    static delete(id) {
        return MenuApi.request(id, 'DELETE').catch(() => {
            throw new Error('Cannot delete menu item on server.');
        });
    }
}
