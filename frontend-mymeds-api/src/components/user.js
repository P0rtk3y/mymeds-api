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
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderUser(){
        let welcomeMessage = document.createElement("div")
            welcomeMessage.innerHTML = ` ${this.name}'s Meds: `
            this.welcome.appendChild(welcomeMessage)
        const logoutButton = document.createElement('button')
            logoutButton.innerHTML = "Logout"
            logoutButton.setAttribute('id', 'logout-button')
            this.buttonEvent.appendChild(logoutButton)
        const addMedButton = document.createElement('button')
            addMedButton.innerHTML = "Add"
            addMedButton.setAttribute('id', 'med-button')
            addMedButton.style.backgroundColor = "#EC8668"
            this.buttonEvent.appendChild(addMedButton)
        this.setTime(this)
    }

    setTime(){
        const addTime = document.createElement("div")
        this.welcome.appendChild(addTime)
        let getTime = new Date()
        let currentTime = getTime.getHours()
        if (currentTime > 4 && currentTime < 11){
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