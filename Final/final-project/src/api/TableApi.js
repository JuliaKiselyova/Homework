const TableApi = {
    API: 'https://mock-api-5678.nw.r.appspot.com/tables/',

    request(url = '', method = 'GET', body) {
        return fetch(TableApi.API + url, {
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
    },

    getList() {
        return TableApi.request().catch(() => {
            throw new Error('Cannot retrieve table list from server.');
        });
    },

    getOne(id) {
        return TableApi.request(id).catch(() => {
            throw new Error('Cannot retrieve one table from server.');
        });
    },

    create(table) {
        return TableApi.request('', 'POST', table).catch(() => {
            throw new Error('Cannot create table on server.');
        });
    },

    update(id, changes) {
        return TableApi.request(id, 'PUT', changes).catch(() => {
            throw new Error('Cannot update table on server.');
        });
    },

    delete(id) {
        return TableApi.request(id, 'DELETE').catch(() => {
            throw new Error('Cannot delete table on server.');
        });
    },
};

export default TableApi;
