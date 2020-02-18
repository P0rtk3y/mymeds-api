class Users {
    constructor(){
        this.users = []
        this.adapter = new UsersAdapter()
        this.initBindingAndEventListeners()
        this.fetchAndLoadUsers()
        this.fetchAndLoginUser()
    }

    initBindingAndEventListeners(){
        this.div = document.getElementById('login-input')
        this.welcome = document.querySelector('header')
        this.userEmailField = document.getElementById('email')
        this.userNameField = document.getElementById('name')
        this.userPasswordField = document.getElementById('password')
        this.submitButton = document.getElementById('button-login')
        this.submitButton.addEventListener('click', this.fetchAndLoginUser.bind(this))
        this.signupButton = document.getElementById('button-signup')
        this.logoutButton = document.createElement("button", "Logout")
        // this.logoutButton.addEventListener('click', this.logoutUser.bind(this))
        // this.signupButton.addEventListener('click')
    }


    fetchAndLoadUsers(){
        this.adapter.getUsers()
            .then(users => {
                for (const user of users){
                    let userObj = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                    let newUser = new User(userObj)
                    this.users.push(newUser)
                }
            })
    }
   

    fetchAndLoginUser(e){
        e.preventDefault()
        const userEmail = this.userEmailField.value
        const userObj = this.users.find(user => user.email === userEmail)
        if(!!userObj){
            this.disableSignUpAndSubmit()
            let welcomeMessage = document.createElement("div")
            welcomeMessage.innerHTML = `${userObj.name}'s Meds:`
            this.welcome.appendChild(welcomeMessage)
            const userId = userObj.id
            this.adapter.getUser(userId)
            .then(user => {
                this.user = new User(user)
            })
            .then(()=>{
                this.setUser()
            })
        } else {
            alert(`${userEmail} has not logged in before. Sign up?`)
        }
    }

    disableSignUpAndSubmit(){
        this.div.innerHTML = ""
        this.welcome.innerHTML = ""
        this.signupButton.remove()
        this.submitButton.remove()
        this.logoutButton.innerHTML = "Logout"
        document.getElementById("footer").appendChild(this.logoutButton)
    }

    logoutUser(){
        console.log("Help!")
        new App()
    }
}