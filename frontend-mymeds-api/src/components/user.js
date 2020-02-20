class User {
    constructor(userObjJSON){
        this.id = userObjJSON.id 
        this.name = userObjJSON.name 
        this.email = userObjJSON.email
        this.password = userObjJSON.password
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.welcome = document.querySelector('header')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderUser(){
        let welcomeMessage = document.createElement("div")
            welcomeMessage.innerHTML = `${this.name}'s Meds:`
            this.welcome.appendChild(welcomeMessage)
        const logoutButton = document.createElement('button')
            logoutButton.innerHTML = "Logout"
            logoutButton.setAttribute('id', 'logout-button')
            this.buttonEvent.appendChild(logoutButton)
        const addMedButton = document.createElement('button')
            addMedButton.innerHTML = "Add"
            addMedButton.setAttribute('id', 'med-button')
            addMedButton.style.backgroundColor = "red"
            this.buttonEvent.appendChild(addMedButton)
    }

    eventFunc(e){
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                // case 'med-button': this.message()
                //     break;
                case 'logout-button': window.location.reload(true)
                    break;
                
            }
            e.stopPropagation()
        }  
    }


}