const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: (key, id) => {
            return fetch(`${remoteURL}/${key}/${id}`)
            .then(result => result.json())
        }
    },
    getAll: {
        value: (key) => {
            return fetch(`${remoteURL}/${key}`)
            .then(result => result.json())
        }
    },
    getUserData: {
        value: (key, userId) => {
            return fetch(`${remoteURL}/${key}?userId=${userId}`)
            .then(res => res.json())
        }
    },
    getUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
            .then(res => res.json())
        }
    },
    getSortedData: {
        value: (key, userId, sortBy, order) => {
            return fetch(`${remoteURL}/${key}?userId=${userId}&_sort=${sortBy}&_order=${order}`)
            .then(res => res.json())
        }
    },
    delete: {
        value: (key, id) => {
            return fetch(`${remoteURL}/${key}/${id}`, {
                method: "DELETE"
            }).then(result => result.json())
        }
    },
    add: {
        value: (key, object) => {
            return fetch(`${remoteURL}/${key}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(result => result.json())
        }
    },
    edit: {
        value: (key, id, object) => {
            return fetch(`${remoteURL}/${key}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(object)
            })
            .then(result => result.json())
        }
    }
})