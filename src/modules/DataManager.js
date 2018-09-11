const remoteURL = "http://localhost:5002"

export default Object.create(null, {
    get: {
        value: function (resource, id) {
            return fetch(`${remoteURL}/${resource}/${id}`).then(r => r.json())
        }
    },
    getAll: {
        value: function (resource) {
            return fetch(`${remoteURL}/${resource}`).then(r => r.json())
        }
    },
    saveNew: {
        value: (resource, newObject) => {
            return fetch(`${remoteURL}/${resource}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(r => r.json())
        }
    },
    edit: {
        value: (resource, id, newObject) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }).then(r => r.json())
        }
    },
    delete: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
            method: "DELETE"
        })
        .then(response => response.json())
        }
    }
})