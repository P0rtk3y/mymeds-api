class Users {
    constructor(){
        this.users = []
        this.adapter = new UsersAdapter()
        this.initBindingAndEventListeners()
        this.fetchAndLoadUsers()
        // this.fetchAndLoginUser()
    }

    initBindingAndEventListeners(){
        this.div = document.querySelector('#login-input')
        this.welcome = document.querySelector('header')
        this.userNameField = document.querySelector('#name')
        this.userEmailField = document.querySelector('#email')
        this.userPasswordField = document.querySelector('#password')
        this.submitButton = document.querySelector('#button-login')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this))
        this.signupButton = document.querySelector('#button-signup')
    }

    fetchAndLoadUsers(){
        this.adapter
            .getUsers()
            .then(users => {
                users.forEach(user => this.users.push(new User(user)))
                }
            )
    }

    createAndLoginUser(){
        const userName = this.userNameField.value
        const email = this.userEmailField.value
        const password = this.userPasswordField.value
        const userObj = this.users.find(user => user.email === email)
        if (!userObj){
            this.adapter.createUser(userName, email, password)
                .then(user => {
                    this.user = new User(user)
                })
                window.location.reload(true)
            } else {
                alert(`${email} is taken.`)
            }
        }
   

    fetchAndLoginUser(){
        const userEmail = this.userEmailField.value
        const userObj = this.users.find(user => user.email === userEmail)
        if(!!userObj){
            this.disableSignUpAndSubmit()
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

    setUser(){
        this.user.renderUser()
    }

    disableSignUpAndSubmit(){
        this.div.innerHTML = ""
        this.welcome.innerHTML = ""
        this.signupButton.remove()
        this.submitButton.remove()
    }
    
    eventFunc(e){
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'button-login': this.fetchAndLoginUser(this)
                    break;
                case 'button-signup': this.createAndLoginUser(this)
                    break;
            }
        }
        e.stopPropagation()
    }
   
}