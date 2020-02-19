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
        this.userEmailField = document.querySelector('#email')
        this.userNameField = document.querySelector('#name')
        this.userPasswordField = document.querySelector('#password')
        this.submitButton = document.querySelector('#button-login')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
        this.signupButton = document.querySelector('#button-signup')
    }

    eventFunc(e){
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'button-login': this.fetchAndLoginUser(this)
            }
        }
        e.stopPropagation()
    }

    fetchAndLoadUsers(){
        this.adapter
            .getUsers()
            .then(users => {
                users.forEach(user => this.users.push(new User(user)))
                }
            )
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
    

   
}