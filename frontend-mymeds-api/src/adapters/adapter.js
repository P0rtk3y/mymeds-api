const BASE_URL = 'http://localhost:3000';
const USERS_URL = `${BASE_URL}/users`

const adapter = {
    getUers: () => {
        return fetch(USERS_URL)
        .then(res => res.json())
    },

    createUser: (name, email, password) => {
        return fetch(USER_URL, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(name, email, password)
        })
        .then(res => res.json())
    }
}