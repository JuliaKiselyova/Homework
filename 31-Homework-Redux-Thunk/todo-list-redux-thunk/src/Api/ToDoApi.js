class ToDoApi {

    static API = 'https://6425d484556bad2a5b441782.mockapi.io/api/todo/'

    static request(url = '', method = 'GET', body) {
        return fetch(ToDoApi.API + url, {
            method,
            body: body ? JSON.stringify(body) : undefined,
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }

                throw new Error('Cannot execute server request');
            })
    }

    static getList() {
        return ToDoApi.request().catch(() => {
            throw new Error('Cannot retreive Todo List from server');
        })
    }

    static createTodoItem(todo) {
        return ToDoApi.request('', 'POST', todo).catch(() => {
            throw new Error('Cannot create new todo item on server');
        })
    }

    static updateTodoItem(id, changes) {
        return ToDoApi.request(`/${id}`, 'PUT', changes).catch(() => {
            throw new Error('Cannot update todo item status on server');
        })
    }

    static deleteItem(id) {
        return ToDoApi.request(id, 'DELETE').catch(() => {
            throw new Error('Cannot delete todo item on server');
        })
    }
}