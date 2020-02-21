class UsersAdapter {
    constructor(){
        this.baseURL = "http://localhost:3000/api/v1/medications";
    }

    getMedications(){
        return fetch(this.baseURL)
        .then(res => res.json()
        )
    }

    createMedications(name, className, photo, info){
        console.log(hello)
        const medication = {
            name: name, 
            class: className,
            photo: photo,
            info: info
        }
        return fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({medication})
        })
        .then(res => res.json())
        
    }
}
