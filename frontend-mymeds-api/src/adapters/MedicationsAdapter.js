class MedicationsAdapter {
    constructor(){
        this.baseURL = "http://localhost:3000/api/v1/medications";
    }

    getMedications(){
        return fetch(this.baseURL)
        .then(res => res.json()
        )
    }

    getMedication(medId){
        return fetch(`${this.baseURL}/${medId}`)
        .then(res => res.json()
        )
    }

    createMedications(name, className, photo, info){
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

    updateMedication(medId, userId, addTime){
        const medication = {
            user_id: userId,
            time_of: addTime
        }
        return fetch(`${this.baseURL}/${medId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({medication})
        })
        .then(res => res.json())
        .catch(error => console.log(error))
    }

}
