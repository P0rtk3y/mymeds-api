class UsersAdapter {
    constructor(){
        this.baseURL = "http://localhost:3000/api/v1/users";
    }

    getUsers(){
        return fetch(this.baseURL)
        .then(res => res.json()
        )
    }

    getUser(userId){
        return fetch(`${this.baseURL}/${userId}`)
        .then(res => res.json()
        )
    }

    createUser(name, email, password){
        let user = {
            name: name,
            email: email,
            password: password
        }
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({user})
        })
        .then(res => res.json())
        .catch(error => console.error(error))
    }
}

// const adapter = {
//     getUers: () => {
//         return fetch(USERS_URL)
//         .then(res => res.json())
//     },

//     createUser: (name, email, password) => {
//         return fetch(USER_URL, {
//             method: 'POST',
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify(name, email, password)
//         })
//         .then(res => res.json())
//     }
// }