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
    }


    fetchAndLoadUsers(){
        this.adapter
            .getUsers()
            .then(users => {
                users.forEach(user => this.users.push(new User(user)))
                }
            )
    }
   

    fetchAndLoginUser(e){
        e.preventDefault
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