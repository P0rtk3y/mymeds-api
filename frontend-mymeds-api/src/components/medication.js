class Medication {
    constructor(medObjJSON){
        this.id = medObjJSON.id 
        this.name = medObjJSON.name 
        this.className = medObjJSON.className
        this.photo = medObjJSON.photo
        this.info = medObjJSON.info
        this.user = medObjJSON.user_id
        this.time_of = medObjJSON.time_of
        this.adapter = new MedicationsAdapter()
        this.initBindingsAndEventListeners()
    }

    initBindingsAndEventListeners(){
        this.div = document.querySelector('#login-input')
        this.buttonEvent = document.querySelector('#buttons')
        this.headerId= document.querySelector('#headerId')
        this.addMedBtn = document.querySelector('#myMed-button')
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

        
        if (!document.querySelector('#selectTime')){
            let timeBox = document.createElement('div')
            timeBox.setAttribute("id", "selectTime")
            let timeDropdownHTML = 
                               '<select id="time">' + 
                               '<option disabled selected value>' + "Choose dosage time" + '</option>' +
                               '<option>' + "morning" + '</option>' + 
                               '<option>' + "evening" + '</option>' + 
                               '</select>'
            timeBox.innerHTML = timeDropdownHTML
            medInfo.appendChild(timeBox)
        }
        
        this.colorize()
        this.addMedBtn.addEventListener("click", e => {
            e.preventDefault()
            e.stopPropagation()
            this.addMedToUser()
        }, false)
    }

    colorize(){
        let classSchedule = this.className.split("")
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

    addMedToUser(){
        const medId = this.id
        let userId = this.headerId.innerHTML
        let addTime = document.querySelector("#time").value
        this.adapter.updateMedication(medId, userId, addTime)
    }


    eventFunc(e){
        e.preventDefault()
        if (e.target !== e.currentTarget){
            let clickedButton = e.target.id;
            switch (clickedButton){
                case 'logout-button': window.location.reload(true)
                    break;
            }
        }  
        e.stopPropagation()
    }
}