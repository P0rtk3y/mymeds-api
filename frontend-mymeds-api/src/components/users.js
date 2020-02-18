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
        this.userEmailField = document.getElementById('email')
        this.userNameField = document.getElementById('name')
        this.userPasswordField = document.getElementById('password')
        this.submitButton = document.getElementById('button-login')
        this.submitButton.addEventListener('click', this.fetchAndLoginUser.bind(this))
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
        console.log(userObj)
        if(!!userObj){
            this.div.innerHTML = ""
            this.submitButton.innerHTML = "Logout"
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
            let btn = document.createElement("button")
            btn.innerHTML = "Sign up"
            document.getElementById('footer').appendChild(btn)
        }
    }
}