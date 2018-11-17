const remoteURL = "https://collect-able-server.herokuapp.com"
// const remoteURL = "http://localhost:8088"

export default Object.create(null, {
    get: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`)
                .then(result => result.json())
        }
    },
    getAll: {
        value: (resource) => {
            return fetch(`${remoteURL}/${resource}`)
                .then(result => result.json())
        }
    },
    getUserData: {
        value: (resource, userId) => {
            return fetch(`${remoteURL}/${resource}?userId=${userId}`)
                .then(res => res.json())
        }
    },
    getCollectables: {
        value: (resource, collectionId) => {
            return fetch(`${remoteURL}/${resource}?collectionId=${collectionId}`)
                .then(res => res.json())
        }
    },
    getUser: {
        value: (username) => {
            return fetch(`${remoteURL}/users?username=${username}`)
                .then(res => res.json())
        }
    },
    getSoldCollectables: {
        value: (resource, collectionId, boolean) => {
            return fetch(`${remoteURL}/${resource}?collectionId=${collectionId}&isSold=${boolean}`)
                .then(res => res.json())
        }
    },
    delete: {
        value: (resource, id) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
                method: "DELETE"
            }).then(result => result.json())
        }
    },
    add: {
        value: (resource, object) => {
            return fetch(`${remoteURL}/${resource}`, {
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
        value: (resource, id, object) => {
            return fetch(`${remoteURL}/${resource}/${id}`, {
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