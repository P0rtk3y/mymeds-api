class Medication {
    constructor(medObjJSON){
        this.id = medObjJSON.id 
        this.name = medObjJSON.name 
        this.className = medObjJSON.className
        this.photo = medObjJSON.photo
        this.info = medObjJSON.info
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.buttonEvent.addEventListener("click", this.eventFunc.bind(this), false)
    }

    renderMedication(){ 
        if (!(document.querySelector('#medInfoContainer'))){
            let medInfoContainer = document.createElement('div')
            medInfoContainer.setAttribute("id", "medInfoContainer")
            this.div.appendChild(medInfoContainer)
        } else {
            document.querySelector('#medInfoContainer').innerHTML = ""
        }
        this.renderBody()
    }

    renderBody(){
        let classBox = document.createElement('div')
            classBox.setAttribute("id", "className")
            classBox.innerText = this.className
        let medPhoto = document.createElement('img')
            medPhoto.setAttribute("alt", "medPhoto")
            medPhoto.setAttribute("id", "medPhoto")
            medPhoto.src = this.photo
        let infoBox = document.createElement('a')
            infoBox.href = this.info
            infoBox.setAttribute("target", "_blank")
            infoBox.appendChild(medPhoto)
        let medInfo = document.querySelector('#medInfoContainer')
            medInfo.append(classBox, infoBox)
        this.div.appendChild(medInfo)
        this.colorize()
    }

    colorize(){
        let classSchedule = this.className.split(" ")
        let classBox = document.querySelector('#className')
        if(classSchedule.includes("2")){
            classBox.style.backgroundColor = "#DE7658"
        } else if (classSchedule.includes("3")){
            classBox.style.backgroundColor = "#DE9358"
        } else if (classSchedule.includes("4")){
            classBox.style.backgroundColor = "#DECD58"
        } else if (classSchedule.includes("5")){
            classBox.style.backgroundColor = "#76A8CC"
        } else {
            classBox.style.backgroundColor = "#fffff"
        }
    }

    eventFunc(e){
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'logout-button': window.location.reload(true)
                    break;
                
            }
            e.stopPropagation()
        }  
    }
}