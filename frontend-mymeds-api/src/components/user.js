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
        this.footer = document.getElementById('footer')
    }

    renderUser(){
        let welcomeMessage = document.createElement("div")
            welcomeMessage.innerHTML = `${this.name}'s Meds:`
            this.welcome.appendChild(welcomeMessage)
        const logoutButton = document.createElement('button')
            logoutButton.innerHTML = "Logout"
            logoutButton.setAttribute('id', 'logout-button')
            this.footer.appendChild(logoutButton)
            logoutButton.addEventListener('click', window.location.reload(true))
    }

}