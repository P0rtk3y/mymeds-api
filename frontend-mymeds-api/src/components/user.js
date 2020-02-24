class User {
    constructor(userObjJSON){
        this.id = userObjJSON.id 
        this.name = userObjJSON.name 
        this.email = userObjJSON.email
        this.password = userObjJSON.password
        this.adapter = new UsersAdapter()
        this.myMeds = []
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.welcome = document.querySelector('header')
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderUser(){
        let welcomeMessage = document.createElement('div')
            welcomeMessage.setAttribute('id', 'headerName')
            welcomeMessage.setAttribute('contenteditable', 'true')
            welcomeMessage.innerHTML = `${this.name}`
        let welcomeMessage2 = document.createElement('div')
            welcomeMessage2.innerHTML = "|| Rx"
            welcomeMessage2.setAttribute('id', 'headerMeds')
        this.welcome.append(welcomeMessage, welcomeMessage2)
        const logoutButton = document.createElement('button')
            logoutButton.innerHTML = "Logout"
            logoutButton.setAttribute('id', 'logout-button')
            this.buttonEvent.appendChild(logoutButton)
        const addButton = document.createElement('button')
            addButton.innerHTML = "Add"
            addButton.setAttribute('id', 'med-button')
            addButton.style.backgroundColor = "#EC8668"
            this.buttonEvent.appendChild(addButton)
        this.setTime(this)
        welcomeMessage.addEventListener('click', e => {
            e.preventDefault()
            this.modifyUsername(this)
        }, false)
    }

    modifyUsername(){
        let oldName = this.name
        let userId = this.id
        let getName = document.querySelector('#headerName')
        let newName = getName.innerHTML
        if(newName !== oldName){
            this.adapter.updateUser(newName, userId)
        }
    }

    renderUserMeds(){

    }

    setTime(){
        const addTime = document.createElement("div")
        this.welcome.appendChild(addTime)
        let getTime = new Date()
        let currentTime = getTime.getHours()
        if (currentTime > 1 && currentTime < 16){
            const addSunImg = document.createElement("img")
            addSunImg.src = "src/images/sun.png"
            addSunImg.setAttribute("class", "timeImg")
            addTime.appendChild(addSunImg)
            this.div.style.backgroundColor = "#DBC695"
        } else {
            const addMoonImg = document.createElement("img")
            addMoonImg.src = "src/images/moon.jpg"
            addMoonImg.setAttribute("class", "timeImg")
            addTime.appendChild(addMoonImg)
            this.div.style.backgroundColor = "#BEC5C7"
        }
    }

    eventFunc(e){
        e.preventDefault()
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'med-button': new Medications()
                    break;
                case 'logout-button': window.location.reload(true)
                    break;
            }
        }  
        e.stopPropagation()
    }


}