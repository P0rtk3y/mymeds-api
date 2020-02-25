class User {
    constructor(userObjJSON){
        this.id = userObjJSON.id 
        this.name = userObjJSON.name 
        this.email = userObjJSON.email
        this.password = userObjJSON.password
        this.medications = userObjJSON.medications
        this.adapter = new UsersAdapter()
        this.myMeds = new MedicationsAdapter()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.welcome = document.querySelector('header')
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderUser(){
        let welcomeMessageId = document.createElement('div')
            welcomeMessageId.setAttribute('id', "headerId")
            welcomeMessageId.innerHTML = `${this.id}`
        let welcomeMessage = document.createElement('div')
            welcomeMessage.setAttribute('id', 'headerName')
            welcomeMessage.setAttribute('contenteditable', 'true')
            welcomeMessage.innerHTML = `${this.name}`
        let welcomeMessage2 = document.createElement('div')
            welcomeMessage2.innerHTML = "|| Rx"
            welcomeMessage2.setAttribute('id', 'headerMeds')
        this.welcome.append(welcomeMessageId, welcomeMessage, welcomeMessage2)
        const logoutButton = document.createElement('button')
            logoutButton.innerHTML = "Logout"
            logoutButton.setAttribute('id', 'logout-button')
            this.buttonEvent.appendChild(logoutButton)
        this.setTime(this)
        this.getUserMeds()
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

    getUserMeds(){
        this.div.innerHTML = ""
        this.myMeds
            .getMedications()
            .then(medications => {
                return medications.filter(m => m.user_id === this.id)
                }
            )
            .then(medData => this.renderMeds(medData))
    }

    renderMeds(medData){
        medData.sort((a,b) => (a.name > b.name)? 1 : -1).forEach(med => {
                let dataContainer = document.createElement('div')
                    dataContainer.setAttribute('id', 'dataContainer')
                let dataName = document.createElement('div')
                    dataName.setAttribute('class', 'medName')
                    dataName.innerHTML = `${med.name} : ${med.className}` 
                let dataPhoto = document.createElement('img')
                    dataPhoto.setAttribute('class', 'medPhoto')
                    dataPhoto.src = med.photo
                dataContainer.append(dataName, dataPhoto)
                this.div.appendChild(dataContainer)
            }
        )
        if(!document.querySelector('#add-button')){
            let addButton = document.createElement('button')
                addButton.setAttribute('id', 'add-button')
                addButton.style.backgroundColor = "#EC8668"
                addButton.innerHTML = "Add"
                this.buttonEvent.appendChild(addButton)
        } else {
            
        }
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
        let home = document.querySelector(".timeImg")
        home.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            this.getUserMeds()
        }, false)
    }

    eventFunc(e){
        e.preventDefault()
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id
          
            switch (clickedButton){
                case 'add-button': new Medications()
                    break;
                case 'logout-button': window.location.reload(true)
                    break;
            }
        }  
        e.stopPropagation()
    }


}